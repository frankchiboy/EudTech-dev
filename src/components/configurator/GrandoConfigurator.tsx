import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  AlertTriangle,
  Box,
  ChevronDown,
  CheckCircle,
  Cpu,
  HardDrive,
  Layers,
  Loader2,
  Monitor,
  Network,
  Package,
  Send,
  Server,
  X,
  Zap
} from 'lucide-react';
import {
  GRANDO_API_BASE_URL,
  GRANDO_CONFIGURATOR_BASE_URL,
  getConfiguratorAssetUrl,
  getConfiguratorDevice,
  getConfiguratorDevices
} from '../../services/api/grandoConfiguratorService';
import { useLanguageContext } from '../../contexts/LanguageContext';
import {
  CONFIGURATOR_MODULES,
  ConfiguratorDevice,
  ConfiguratorBackgroundImage,
  ConfiguratorModule,
  ConfiguratorOption,
  ConfiguratorSpec,
  ConfiguratorSpecItem,
  ConfiguratorValidation
} from '../../types/configurator';
import {
  USAGE_COLORS,
  applyQueryToSpec,
  buildRecommendedSpec,
  calculateConfiguratorPrice,
  getConfiguratorBackgrounds,
  getConfiguratorModelName,
  getConfiguratorValidation,
  getPciUsage,
  getTotalGpuMemory
} from '../../utils/configurator/calculations';
import {
  CONFIGURATOR_COPY,
  CONFIGURATOR_MODULE_LABELS,
  ConfiguratorLocale,
  formatLocalizedSpecValue,
  getConfiguratorLocale,
  getConfiguratorNumberLocale,
  getLocalizedSpecNote,
  translateConfiguratorDeviceType,
  translateConfiguratorFilterLabel,
  translateConfiguratorHotspot,
  translateConfiguratorModelName,
  translateConfiguratorUsage,
  translateConfiguratorValidation
} from '../../utils/configurator/localization';
import { useClipboard } from '../../hooks/ui/useClipboard';
import { emailService } from '../../services/emailService';
import { isValidEmail } from '../../utils/validators';
import './Configurator.css';

type DeviceSummary = ConfiguratorDevice & { options: ConfiguratorOption[] };

const QUOTE_RECIPIENT_EMAIL = 'info@eudaemonia.tech';
const MOBILE_CONFIGURATOR_MEDIA_QUERY = '(max-width: 767px)';
const MOBILE_CONFIGURATOR_IMAGE_WIDTH = 750;
const MOBILE_PRODUCT_IMAGE_WIDTH = 480;
const PRODUCT_IMAGE_QUALITY = 68;
const LOCAL_PRODUCT_IMAGE_FILENAMES = new Set([
  '2x6000ADA_Ddd293j',
  '2x6000ADA_ver',
  '4a100_device_2WG9u3A',
  '4a100_device_PCwK1VP',
  '6xA100',
  '6xGPU_front',
  '8x4090_8LVQBar',
  'GRANDO_DPR_4090-FT_6_38-3',
  'INT_SERVER_8xH100'
]);
const PRODUCT_IMAGE_ALIASES: Record<string, { mobile: string; desktop: string }> = {
  INT_SERVER_8xH100_JbnnrGs: {
    mobile: '/images/configurator/devices/comino-integration-kit-8x-pro-6000.webp',
    desktop:
      'https://cdn.prod.website-files.com/6277aefa6e0ea678fd302833/698d8eb289b9d6f4d8105f3a__DSF5156%20(1).jpg'
  },
  '2x6000ADA_hH5G8vZ_J5GRGRF': {
    mobile: '/images/configurator/devices/comino-rtx-pro-6000-workstation.webp',
    desktop: 'https://cdn.prod.website-files.com/627a9ed158f3430181d090ef/670fd78318945795ec618274_23-2.jpg'
  }
};

interface QuoteFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  comment: string;
}

type QuoteFormErrors = Partial<Record<keyof QuoteFormData, string>>;

const initialQuoteFormData: QuoteFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  comment: ''
};

interface OptionSectionProps {
  label: string;
  language: ConfiguratorLocale;
  moduleKey: ConfiguratorModule;
  icon: React.ReactNode;
  options: ConfiguratorOption[];
  selected?: ConfiguratorSpecItem;
  isOpen: boolean;
  max?: number;
  validation?: ConfiguratorValidation;
  onToggle: () => void;
  onSelect: (moduleKey: ConfiguratorModule, option: ConfiguratorOption) => void;
  onQuantityChange: (moduleKey: ConfiguratorModule, quantity: number) => void;
}

const typeOrder = ['Server', 'Rackable Workstation', 'Desktop Workstation', 'Integration Kit'];

const moduleOrder: ConfiguratorModule[] = [
  'gpu',
  'cpu',
  'ram',
  'storage',
  'storage_1',
  'storage_2',
  'storage_3',
  'storage_4',
  'psu',
  'network'
];

const iconClassName = 'h-5 w-5';

const getTypeIcon = (type: string) => {
  if (type === 'Server') {
    return <Server className="h-6 w-6" />;
  }

  if (type === 'Desktop Workstation') {
    return <Monitor className="h-6 w-6" />;
  }

  if (type === 'Integration Kit') {
    return <Package className="h-6 w-6" />;
  }

  return <Layers className="h-6 w-6" />;
};

const getModuleIcon = (moduleKey: ConfiguratorModule) => {
  switch (moduleKey) {
    case 'gpu':
      return <Layers className={iconClassName} />;
    case 'cpu':
      return <Cpu className={iconClassName} />;
    case 'ram':
      return <Box className={iconClassName} />;
    case 'psu':
      return <Zap className={iconClassName} />;
    case 'network':
      return <Network className={iconClassName} />;
    default:
      return <HardDrive className={iconClassName} />;
  }
};

const isMobileConfiguratorViewport = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia(MOBILE_CONFIGURATOR_MEDIA_QUERY).matches;
};

const useMobileConfiguratorViewport = () => {
  const [isMobile, setIsMobile] = useState(isMobileConfiguratorViewport);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(MOBILE_CONFIGURATOR_MEDIA_QUERY);
    const handleChange = () => setIsMobile(mediaQuery.matches);
    handleChange();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return isMobile;
};

const getMobileConfiguratorBackgroundUrl = (url: string, isMobile: boolean) => {
  if (!isMobile || !url.startsWith(`${GRANDO_CONFIGURATOR_BASE_URL}/image/`)) {
    return url;
  }

  const imagePath = url.slice(GRANDO_CONFIGURATOR_BASE_URL.length);
  return `${GRANDO_CONFIGURATOR_BASE_URL}/_next/image?url=${encodeURIComponent(imagePath)}&w=${MOBILE_CONFIGURATOR_IMAGE_WIDTH}&q=75`;
};

const getNetlifyImageUrl = (url: string, width: number) => {
  return `/.netlify/images?url=${encodeURIComponent(url)}&w=${width}&q=${PRODUCT_IMAGE_QUALITY}&fm=webp`;
};

const canUseNetlifyImageCdn = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const hostname = window.location.hostname;
  return !(
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.startsWith('192.168.') ||
    hostname.startsWith('10.') ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)
  );
};

const getProductImageUrl = (url: string, isMobile: boolean) => {
  if (!url.startsWith(`${GRANDO_API_BASE_URL}/media/device/`)) {
    return url;
  }

  const imageName = url.split('/').pop()?.replace(/\.[^.]+$/, '') || '';
  const alias = PRODUCT_IMAGE_ALIASES[imageName];

  if (alias) {
    return isMobile ? alias.mobile : alias.desktop;
  }

  if (!isMobile) {
    return url;
  }

  if (LOCAL_PRODUCT_IMAGE_FILENAMES.has(imageName)) {
    return `/images/configurator/devices/${imageName}.webp`;
  }

  return canUseNetlifyImageCdn() ? getNetlifyImageUrl(url, MOBILE_PRODUCT_IMAGE_WIDTH) : url;
};

const getOptionFilterValue = (moduleKey: ConfiguratorModule, option: ConfiguratorOption) => {
  if (moduleKey === 'gpu' || moduleKey === 'cpu') {
    return option.brand || '';
  }

  if (moduleKey.startsWith('storage_')) {
    return option.type || '';
  }

  return '';
};

const LoadingState = ({ fixed = false }: { fixed?: boolean }) => (
  <div className={fixed ? 'grando-loader grando-loader-fixed' : 'grando-loader'}>
    <Loader2 className="h-10 w-10 animate-spin text-[#00be5f]" />
  </div>
);

const ErrorState = ({ message, actionLabel, onRetry }: { message: string; actionLabel: string; onRetry: () => void }) => (
  <div className="grando-error">
    <p>{message}</p>
    <button type="button" onClick={onRetry} className="grando-button">
      {actionLabel}
    </button>
  </div>
);

const ProductCard = ({
  device,
  language,
  priority = false
}: {
  device: DeviceSummary;
  language: ConfiguratorLocale;
  priority?: boolean;
}) => {
  const navigate = useNavigate();
  const isMobile = useMobileConfiguratorViewport();
  const [imageFailed, setImageFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const copy = CONFIGURATOR_COPY[language];
  const gpu = device.options.find((option) => option.module_type === 'gpu');
  const cpu = device.options.find((option) => option.module_type === 'cpu');
  const originalImageUrl = device.photo ? getConfiguratorAssetUrl(device.photo) : '';
  const imageUrl = originalImageUrl && !imageFailed ? getProductImageUrl(originalImageUrl, isMobile) : '';

  useEffect(() => {
    setImageFailed(false);
    setImageLoaded(false);
  }, [originalImageUrl, isMobile]);

  return (
    <article className={`grando-product-card ${device.type === 'Server' ? 'grando-product-card-server' : ''}`}>
      <header className="grando-product-media">
        <div className="grando-product-image-wrap">
          {imageUrl ? (
            <>
              {!imageLoaded ? (
                <div className="grando-product-image-placeholder" aria-hidden="true">
                  {getTypeIcon(device.type)}
                </div>
              ) : null}
              <img
                src={imageUrl}
                alt={`Comino Grando ${device.name}`}
                className={`grando-product-image ${imageLoaded ? 'loaded' : 'loading'}`}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={priority ? 'high' : 'auto'}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageFailed(true)}
              />
            </>
          ) : (
            <div className="grando-product-image-fallback" aria-label={`Comino Grando ${device.name}`}>
              {getTypeIcon(device.type)}
            </div>
          )}
        </div>
        <div className="grando-usage-dots" aria-label={copy.usageCategories}>
          {device.usage.map((usage) => (
            <span
              key={usage}
              title={translateConfiguratorUsage(usage, language)}
              className="grando-usage-dot"
              style={{ backgroundColor: USAGE_COLORS[usage] || '#ffffff' }}
            />
          ))}
        </div>
      </header>

      <div className="grando-product-meta">
        <h3>{device.name}</h3>
        {gpu ? (
          <p>
            <Layers className="h-4 w-4" />
            x{device.defaults?.gpu || 1} {gpu.name}
          </p>
        ) : null}
        {cpu ? (
          <p>
            <Cpu className="h-4 w-4" />
            x{device.defaults?.cpu || 1} {cpu.name}
          </p>
        ) : null}
      </div>

      <footer className="grando-product-actions">
        <button type="button" className="grando-button" onClick={() => navigate(`/configurator/${device.id}`)}>
          {copy.customize}
        </button>
        <button
          type="button"
          className="grando-button grando-button-secondary"
          onClick={() => navigate(`/configurator/${device.id}?request=true`)}
        >
          {copy.requestQuote}
        </button>
      </footer>
    </article>
  );
};

const ConfiguratorHome = ({ language }: { language: ConfiguratorLocale }) => {
  const [devices, setDevices] = useState<DeviceSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUsage, setSelectedUsage] = useState<string | null>(null);
  const copy = CONFIGURATOR_COPY[language];

  const loadDevices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getConfiguratorDevices();
      setDevices(data);
    } catch {
      setError('load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDevices();
  }, [loadDevices]);

  const usages = useMemo(() => {
    const values = new Set<string>();
    devices.forEach((device) => device.usage.forEach((usage) => values.add(usage)));
    return Array.from(values);
  }, [devices]);

  const groupedDevices = useMemo(() => {
    return typeOrder
      .map((type) => ({
        type,
        devices: devices.filter((device) => {
          const typeMatches = device.type === type;
          const usageMatches = selectedUsage ? device.usage.includes(selectedUsage) : true;
          return typeMatches && usageMatches;
        })
      }))
      .filter((group) => group.devices.length > 0);
  }, [devices, selectedUsage]);

  const scrollToType = (type: string) => {
    const element = document.getElementById(`grando-${type.toLowerCase().replace(/\s+/g, '-')}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="grando-page grando-list-page">
      <div className="grando-list-shell">
        <h1>{copy.homeTitle}</h1>

        <div className="grando-selector-panel">
          <span className="grando-floating-label">{copy.selectorLabel}</span>
          <nav className="grando-type-nav" aria-label={copy.productTypeNav}>
            {typeOrder.map((type) => (
              <button key={type} type="button" onClick={() => scrollToType(type)} className="grando-type-button">
                {getTypeIcon(type)}
                <span>{translateConfiguratorDeviceType(type, language)}</span>
              </button>
            ))}
          </nav>

          <nav className="grando-usage-filter" aria-label={copy.usageFilters}>
            {usages.map((usage) => (
              <button
                key={usage}
                type="button"
                className={selectedUsage === usage ? 'active' : ''}
                onClick={() => setSelectedUsage((current) => (current === usage ? null : usage))}
              >
                {translateConfiguratorUsage(usage, language)}
              </button>
            ))}
          </nav>
        </div>

        {loading ? <LoadingState /> : null}
        {error ? (
          <ErrorState
            message={error === 'load' ? copy.loadErrorFallback : error}
            actionLabel={copy.retry}
            onRetry={loadDevices}
          />
        ) : null}

        {!loading && !error ? (
          <div className="grando-product-sections">
            {groupedDevices.length ? (
              groupedDevices.map((group) => (
                <section
                  key={group.type}
                  id={`grando-${group.type.toLowerCase().replace(/\s+/g, '-')}`}
                  className="grando-product-section"
                >
                  <h2>{translateConfiguratorDeviceType(group.type, language, true)}</h2>
                  <hr />
                  <div className="grando-product-grid">
                    {group.devices.map((device, deviceIndex) => (
                      <ProductCard
                        key={device.id}
                        device={device}
                        language={language}
                        priority={group.type === 'Server' && deviceIndex < 3}
                      />
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <div className="grando-empty">
                <p>{copy.emptyMessage}</p>
                <button type="button" className="grando-button" onClick={() => setSelectedUsage(null)}>
                  {copy.clearFilter}
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
};

const OptionSection = ({
  label,
  language,
  moduleKey,
  icon,
  options,
  selected,
  isOpen,
  max = 99,
  validation,
  onToggle,
  onSelect,
  onQuantityChange
}: OptionSectionProps) => {
  const copy = CONFIGURATOR_COPY[language];
  const filterValues = useMemo(() => {
    const values = options
      .map((option) => getOptionFilterValue(moduleKey, option))
      .filter((value): value is string => Boolean(value));
    return Array.from(new Set(values));
  }, [moduleKey, options]);

  const selectedFilter = selected ? getOptionFilterValue(moduleKey, selected) : '';
  const [activeFilter, setActiveFilter] = useState(selectedFilter);

  useEffect(() => {
    setActiveFilter(selectedFilter);
  }, [selectedFilter]);

  const visibleOptions = useMemo(() => {
    const list = activeFilter
      ? options.filter((option) => getOptionFilterValue(moduleKey, option).toLowerCase() === activeFilter.toLowerCase())
      : options;
    return [...list].sort((first, second) => first.volume - second.volume);
  }, [activeFilter, moduleKey, options]);

  const quantities = selected?.custom_values || [];

  return (
    <section className={`grando-config-section ${isOpen ? 'open' : ''}`}>
      <header>
        <button type="button" className="grando-config-section-title" onClick={onToggle}>
          <span className="grando-config-section-icon">{icon}</span>
          <span>{label}</span>
        </button>
        <div className="grando-config-section-actions">
          {validation?.[moduleKey] ? (
            <button
              type="button"
              className="grando-warning-button"
              aria-label={`${label} ${copy.warning}`}
              title={translateConfiguratorValidation(validation[moduleKey], language)}
            >
              <AlertTriangle className="h-4 w-4" />
            </button>
          ) : null}
          <button type="button" className="grando-chevron-button" onClick={onToggle} aria-label={`${copy.toggle} ${label}`}>
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </header>

      {isOpen ? (
        <div className="grando-config-section-body">
          {filterValues.length ? (
            <div className="grando-chip-row">
              {filterValues.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={activeFilter.toLowerCase() === value.toLowerCase() ? 'active' : ''}
                  onClick={() => setActiveFilter(value)}
                >
                  {translateConfiguratorFilterLabel(value, language)}
                </button>
              ))}
            </div>
          ) : null}

          {moduleKey === 'gpu' && quantities.length ? (
            <div className="grando-quantity-row">
              {quantities.map((quantity) => (
                <button
                  key={quantity}
                  type="button"
                  disabled={quantity > max}
                  className={selected?.total_quantity === quantity ? 'active' : ''}
                  onClick={() => onQuantityChange(moduleKey, quantity)}
                >
                  x{quantity}
                </button>
              ))}
            </div>
          ) : null}

          {moduleKey === 'cpu' && quantities.length ? (
            <div className="grando-core-picker">
              <div className="grando-quantity-row">
                {quantities.map((quantity) => (
                  <button
                    key={quantity}
                    type="button"
                    className={selected?.total_quantity === quantity ? 'active' : ''}
                    onClick={() => onQuantityChange(moduleKey, quantity)}
                  >
                    {quantity}
                  </button>
                ))}
              </div>
              <span>{copy.cores}</span>
            </div>
          ) : null}

          <div className="grando-option-list">
            {visibleOptions.map((option) => {
              const isActive = selected?.unique_id === option.unique_id;
              return (
                <button
                  key={`${moduleKey}-${option.id || option.unique_id}-${option.name}`}
                  type="button"
                  className={`grando-option ${isActive ? 'active' : ''}`}
                  onClick={() => onSelect(moduleKey, option)}
                >
                  <span>{option.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
};

const BackgroundSlider = ({
  images,
  language
}: {
  images: ConfiguratorBackgroundImage[];
  language: ConfiguratorLocale;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMobileConfiguratorViewport();
  const copy = CONFIGURATOR_COPY[language];
  const renderedImages = useMemo(() => {
    if (!isMobile) {
      return images.map((image, index) => ({ image, index }));
    }

    const activeImage = images[activeIndex] || images[0];
    return activeImage ? [{ image: activeImage, index: activeIndex }] : [];
  }, [activeIndex, images, isMobile]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % Math.max(images.length, 1));
    }, 5200);

    return () => window.clearInterval(timer);
  }, [images.length]);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  return (
    <div className="grando-background-slider">
      {renderedImages.map(({ image, index }) => (
        <div
          key={isMobile ? `${image.url}-mobile-${index}` : image.url}
          className={`grando-background-slide ${activeIndex === index ? 'active' : ''}`}
        >
          <img
            src={getMobileConfiguratorBackgroundUrl(image.url, isMobile)}
            alt=""
            loading={isMobile ? 'eager' : undefined}
            decoding={isMobile ? 'async' : undefined}
          />
          {image.points.map((point, pointIndex) => (
            <span
              key={`${image.url}-${point.top}-${point.left}`}
              className="grando-hotspot"
              style={{
                top: `${point.top}%`,
                left: `${point.left}%`,
                animationDelay: `${pointIndex}s`
              }}
              title={translateConfiguratorHotspot(point.title, language)}
              tabIndex={0}
              aria-label={translateConfiguratorHotspot(point.title, language)}
            >
              <span className="grando-hotspot-tooltip">{translateConfiguratorHotspot(point.title, language)}</span>
            </span>
          ))}
        </div>
      ))}
      <div className="grando-slide-dots">
        {images.map((image, index) => (
          <button
            key={image.url}
            type="button"
            className={activeIndex === index ? 'active' : ''}
            onClick={() => setActiveIndex(index)}
            aria-label={`${copy.showImage} ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const SpecRow = ({ label, moduleKey, item, count, language }: {
  label: string;
  moduleKey: ConfiguratorModule;
  item?: ConfiguratorSpecItem;
  count?: boolean;
  language: ConfiguratorLocale;
}) => {
  if (!item) {
    return null;
  }

  const gpuMemory = getTotalGpuMemory({ gpu: item });
  const note = getLocalizedSpecNote(moduleKey, item, language);
  const copy = CONFIGURATOR_COPY[language];

  return (
    <section className="grando-spec-row">
      <div className="grando-spec-label">{label}</div>
      <div className="grando-spec-value">
        {count ? <span>{item.total_quantity}x&nbsp;</span> : null}
        <span>{formatLocalizedSpecValue(moduleKey, item, language)}</span>
        {moduleKey === 'gpu' && gpuMemory ? (
          <small>
            {copy.totalGpuMemory} {gpuMemory.toLocaleString(getConfiguratorNumberLocale(language))}GB
          </small>
        ) : null}
        {note ? <small>{note}</small> : null}
      </div>
    </section>
  );
};

const QuotePanel = ({
  spec,
  validation,
  requestMode,
  language
}: {
  spec: ConfiguratorSpec;
  validation: ConfiguratorValidation;
  requestMode: boolean;
  language: ConfiguratorLocale;
}) => {
  const quotePanelRef = useRef<HTMLDivElement>(null);
  const { copyToClipboard, hasCopied, error: copyError } = useClipboard();
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>(initialQuoteFormData);
  const [formErrors, setFormErrors] = useState<QuoteFormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');
  const copy = CONFIGURATOR_COPY[language];
  const modelName = translateConfiguratorModelName(getConfiguratorModelName(spec), language);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const quoteSummary = [
    `${copy.quoteRequest}: ${spec.device?.name || copy.systemFallback}`,
    `${copy.model}: ${modelName}`,
    `GPU: ${spec.gpu?.total_quantity || 1}x ${spec.gpu?.name || ''}`,
    `CPU: ${formatLocalizedSpecValue('cpu', spec.cpu, language)}`,
    `RAM: ${formatLocalizedSpecValue('ram', spec.ram, language)}`,
    `${copy.configurationLink}: ${currentUrl}`
  ].join('\n');
  const quoteSubject = `${copy.quoteSubject} - ${modelName}`;

  useEffect(() => {
    if (requestMode) {
      quotePanelRef.current?.scrollIntoView({ block: 'center' });
      if (!validation.button) {
        setFormOpen(true);
      }
    }
  }, [requestMode, validation.button]);

  useEffect(() => {
    if (!formOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && submitStatus !== 'submitting') {
        setFormOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [formOpen, submitStatus]);

  const handleFixConfig = () => {
    document.querySelector('.grando-sidebar')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  const handleOpenQuoteForm = () => {
    setFormOpen(true);
    setSubmitStatus('idle');
    setSubmitError('');
  };

  const handleShare = () => {
    void copyToClipboard(currentUrl);
  };

  const updateQuoteField = (field: keyof QuoteFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const validateQuoteForm = () => {
    const nextErrors: QuoteFormErrors = {};

    if (!formData.firstName.trim()) {
      nextErrors.firstName = copy.requiredField;
    }
    if (!formData.lastName.trim()) {
      nextErrors.lastName = copy.requiredField;
    }
    if (!formData.email.trim()) {
      nextErrors.email = copy.requiredField;
    } else if (!isValidEmail(formData.email)) {
      nextErrors.email = copy.invalidEmail;
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = copy.requiredField;
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleQuoteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateQuoteForm()) {
      return;
    }

    setSubmitStatus('submitting');
    setSubmitError('');

    if (!emailService.isConfigured()) {
      setSubmitStatus('error');
      setSubmitError(copy.emailServiceMissingConfig);
      return;
    }

    const message = [
      copy.quoteEmailIntro,
      '',
      quoteSummary,
      '',
      `${copy.quoteFields.phone}: ${formData.phone.trim()}`,
      `${copy.quoteFields.country}: ${formData.country.trim() || copy.notProvided}`,
      `${copy.quoteFields.comment}: ${formData.comment.trim() || copy.notProvided}`
    ].join('\n');

    try {
      await emailService.sendEmail({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        country: formData.country.trim(),
        subject: quoteSubject,
        toEmail: QUOTE_RECIPIENT_EMAIL,
        message,
        privacy: true
      });
      setSubmitStatus('success');
      setFormData(initialQuoteFormData);
      setFormErrors({});
    } catch (error) {
      setSubmitStatus('error');
      setSubmitError(error instanceof Error ? error.message : copy.quoteErrorFallback);
    }
  };

  const closeQuoteForm = () => {
    if (submitStatus === 'submitting') {
      return;
    }
    setFormOpen(false);
  };

  return (
    <div className="grando-quote-panel" ref={quotePanelRef}>
      {validation.button ? (
        <button
          type="button"
          className="grando-button grando-quote-button grando-quote-button-error"
          onClick={handleFixConfig}
        >
          {copy.fixConfig}
        </button>
      ) : (
        <button type="button" className="grando-button grando-quote-button" onClick={handleOpenQuoteForm}>
          {copy.getQuote}
        </button>
      )}
      <button type="button" className="grando-button grando-share-button" onClick={handleShare}>
        {copy.share}
      </button>
      {validation.button ? (
        <p className="grando-button-note">{translateConfiguratorValidation(validation.button, language)}</p>
      ) : null}
      <p className="grando-share-status" aria-live="polite">
        {hasCopied ? copy.linkCopied : copyError ? copy.linkCopyFailed : ''}
      </p>
      {formOpen && typeof document !== 'undefined' ? createPortal(
        <div className="grando-quote-modal" role="dialog" aria-modal="true" aria-labelledby="grando-quote-title">
          <button
            type="button"
            className="grando-quote-modal-backdrop"
            aria-label={copy.closeQuoteForm}
            onClick={closeQuoteForm}
          />
          <div className="grando-quote-dialog">
            <header className="grando-quote-dialog-header">
              <div>
                <span>{copy.quoteRecipientLabel}: {QUOTE_RECIPIENT_EMAIL}</span>
                <h3 id="grando-quote-title">{copy.quoteModalTitle}</h3>
                <p>{copy.quoteModalLead}</p>
              </div>
              <button type="button" className="grando-icon-button" onClick={closeQuoteForm} aria-label={copy.closeQuoteForm}>
                <X className="h-5 w-5" />
              </button>
            </header>

            {submitStatus === 'success' ? (
              <div className="grando-quote-success" role="status">
                <CheckCircle className="h-10 w-10" />
                <h4>{copy.quoteSuccessTitle}</h4>
                <p>{copy.quoteSuccessMessage}</p>
                <button type="button" className="grando-button grando-quote-button" onClick={closeQuoteForm}>
                  {copy.quoteDone}
                </button>
              </div>
            ) : (
              <form className="grando-quote-form" onSubmit={handleQuoteSubmit}>
                <div className="grando-quote-form-grid">
                  <label>
                    <span>{copy.quoteFields.firstName}</span>
                    <input
                      value={formData.firstName}
                      onChange={(event) => updateQuoteField('firstName', event.target.value)}
                      autoComplete="given-name"
                    />
                    {formErrors.firstName ? <small>{formErrors.firstName}</small> : null}
                  </label>
                  <label>
                    <span>{copy.quoteFields.lastName}</span>
                    <input
                      value={formData.lastName}
                      onChange={(event) => updateQuoteField('lastName', event.target.value)}
                      autoComplete="family-name"
                    />
                    {formErrors.lastName ? <small>{formErrors.lastName}</small> : null}
                  </label>
                  <label>
                    <span>{copy.quoteFields.email}</span>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(event) => updateQuoteField('email', event.target.value)}
                      autoComplete="email"
                    />
                    {formErrors.email ? <small>{formErrors.email}</small> : null}
                  </label>
                  <label>
                    <span>{copy.quoteFields.phone}</span>
                    <input
                      value={formData.phone}
                      onChange={(event) => updateQuoteField('phone', event.target.value)}
                      autoComplete="tel"
                    />
                    {formErrors.phone ? <small>{formErrors.phone}</small> : null}
                  </label>
                  <label>
                    <span>{copy.quoteFields.country} <em>{copy.optionalField}</em></span>
                    <input
                      value={formData.country}
                      onChange={(event) => updateQuoteField('country', event.target.value)}
                      autoComplete="country-name"
                    />
                  </label>
                </div>
                <label className="grando-quote-form-message">
                  <span>{copy.quoteFields.comment} <em>{copy.optionalField}</em></span>
                  <textarea
                    rows={4}
                    value={formData.comment}
                    onChange={(event) => updateQuoteField('comment', event.target.value)}
                  />
                </label>
                <section className="grando-quote-summary" aria-label={copy.quoteSummaryTitle}>
                  <strong>{copy.quoteSummaryTitle}</strong>
                  <pre>{quoteSummary}</pre>
                </section>
                {submitStatus === 'error' ? (
                  <p className="grando-quote-error" role="alert">
                    {submitError || copy.quoteErrorFallback}
                  </p>
                ) : null}
                <div className="grando-quote-actions">
                  <button type="button" className="grando-button grando-button-secondary" onClick={closeQuoteForm}>
                    {copy.cancelQuote}
                  </button>
                  <button type="submit" className="grando-button" disabled={submitStatus === 'submitting'}>
                    {submitStatus === 'submitting' ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {submitStatus === 'submitting' ? copy.submittingQuote : copy.submitQuote}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>,
        document.body
      ) : null}
    </div>
  );
};

const ConfiguratorDetail = ({ pid, language }: { pid: string; language: ConfiguratorLocale }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [device, setDevice] = useState<ConfiguratorDevice | null>(null);
  const [options, setOptions] = useState<ConfiguratorOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openModule, setOpenModule] = useState<ConfiguratorModule>('gpu');
  const copy = CONFIGURATOR_COPY[language];
  const moduleLabels = CONFIGURATOR_MODULE_LABELS[language];

  const loadDevice = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getConfiguratorDevice(pid);
      setDevice(data.device);
      setOptions(data.options);
    } catch {
      setError('load');
    } finally {
      setLoading(false);
    }
  }, [pid]);

  useEffect(() => {
    void loadDevice();
  }, [loadDevice]);

  const spec = useMemo(() => {
    if (!device) {
      return {};
    }

    const baseSpec = buildRecommendedSpec(device, options);
    const nextSpec = applyQueryToSpec(baseSpec, options, searchParams);
    nextSpec.price = calculateConfiguratorPrice(nextSpec);
    return nextSpec;
  }, [device, options, searchParams]);

  const validation = useMemo(() => getConfiguratorValidation(spec), [spec]);
  const backgroundImages = useMemo(() => getConfiguratorBackgrounds(openModule, spec), [openModule, spec]);
  const requestMode = searchParams.get('request') === 'true';

  const updateSearch = (updater: (next: URLSearchParams) => void) => {
    const next = new URLSearchParams(searchParams);
    updater(next);
    setSearchParams(next, { replace: false });
  };

  const selectOption = (moduleKey: ConfiguratorModule, option: ConfiguratorOption) => {
    updateSearch((next) => {
      if (option.unique_id) {
        next.set(moduleKey, option.unique_id);
      }

      if (moduleKey === 'gpu') {
        const quantity = spec.gpu?.total_quantity || option.custom_values[0] || 1;
        next.set('gpu_value', String(quantity));
      }

      if (moduleKey === 'cpu') {
        const current = spec.cpu?.total_quantity || option.custom_values[0] || 1;
        const allowed = option.custom_values.length ? option.custom_values : [current];
        const quantity = allowed.includes(current) ? current : Math.max(...allowed);
        next.set('cpu_value', String(quantity));
      }
    });
  };

  const changeQuantity = (moduleKey: ConfiguratorModule, quantity: number) => {
    updateSearch((next) => {
      if (moduleKey === 'gpu') {
        next.set('gpu_value', String(quantity));
      }

      if (moduleKey === 'cpu') {
        next.set('cpu_value', String(quantity));
      }
    });
  };

  const getOptions = (moduleKey: ConfiguratorModule) => {
    return options.filter((option) => option.module_type === moduleKey);
  };

  return (
    <section className="grando-page grando-detail-page">
      <BackgroundSlider images={backgroundImages} language={language} />

      {loading ? <LoadingState fixed /> : null}
      {error ? (
        <ErrorState
          message={error === 'load' ? copy.loadErrorFallback : error}
          actionLabel={copy.retry}
          onRetry={loadDevice}
        />
      ) : null}

      {!loading && !error && device ? (
        <div className="grando-configurator-shell">
          <aside className="grando-sidebar" aria-label={copy.configurationControls}>
            {moduleOrder.map((moduleKey) => (
              <OptionSection
                key={moduleKey}
                label={moduleLabels[moduleKey]}
                language={language}
                moduleKey={moduleKey}
                icon={getModuleIcon(moduleKey)}
                options={getOptions(moduleKey)}
                selected={spec[moduleKey] as ConfiguratorSpecItem | undefined}
                isOpen={openModule === moduleKey}
                max={moduleKey === 'gpu' ? device.gpu_slots : 99}
                validation={validation}
                onToggle={() => setOpenModule((current) => (current === moduleKey ? 'gpu' : moduleKey))}
                onSelect={selectOption}
                onQuantityChange={changeQuantity}
              />
            ))}
          </aside>

          <aside className="grando-spec" aria-label={copy.modelSpecAria}>
            <h1>
              {copy.modelSpecification}
              <span>{translateConfiguratorModelName(getConfiguratorModelName(spec), language)}</span>
            </h1>

            <div className="grando-pci">
              <span>
                {getPciUsage(spec)} {copy.pcieSlotsPlanned}
              </span>
              {validation.important ? (
                <strong>{translateConfiguratorValidation(validation.important, language)}</strong>
              ) : null}
            </div>

            <div className="grando-spec-list">
              {CONFIGURATOR_MODULES.filter((moduleKey) => moduleOrder.includes(moduleKey)).map((moduleKey) => (
                <SpecRow
                  key={moduleKey}
                  label={moduleLabels[moduleKey]}
                  moduleKey={moduleKey}
                  item={spec[moduleKey] as ConfiguratorSpecItem | undefined}
                  count={moduleKey === 'gpu' || moduleKey === 'nvlink'}
                  language={language}
                />
              ))}
            </div>

            <QuotePanel spec={spec} validation={validation} requestMode={requestMode} language={language} />
          </aside>
        </div>
      ) : null}
    </section>
  );
};

const GrandoConfigurator = () => {
  const { pid } = useParams();
  const { isEnglish } = useLanguageContext();
  const language = getConfiguratorLocale(isEnglish);

  return pid ? <ConfiguratorDetail pid={pid} language={language} /> : <ConfiguratorHome language={language} />;
};

export default GrandoConfigurator;
