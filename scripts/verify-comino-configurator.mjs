const endpointOrigin = (process.env.COMINO_CONFIGURATOR_ORIGIN || process.argv[2] || '').replace(/\/$/, '');
const requiredModules = ['gpu', 'cpu', 'ram', 'storage', 'storage_1', 'storage_2', 'storage_3', 'storage_4', 'psu', 'network'];

if (!endpointOrigin.startsWith('https://')) {
  throw new Error('Set COMINO_CONFIGURATOR_ORIGIN to the HTTPS site URL that hosts /api/comino-configurator.');
}

const fetchJson = async (path) => {
  const response = await fetch(`${endpointOrigin}${path}`, { headers: { Accept: 'application/json' } });
  const payload = await response.json();
  if (!response.ok || !payload.ok) {
    throw new Error(`${path} failed: ${payload.error || response.status}`);
  }
  if (!['official_live', 'official_cache'].includes(payload.source)) {
    throw new Error(`${path} returned an unverified source: ${payload.source || 'missing'}`);
  }
  return payload;
};

const devicesResponse = await fetchJson('/api/comino-configurator');
const devices = devicesResponse.payload?.devices;
if (!Array.isArray(devices) || devices.length === 0) {
  throw new Error('The official Comino device list is empty.');
}

const results = [];
for (const device of devices) {
  const result = await fetchJson(`/api/comino-configurator?device=${encodeURIComponent(device.id)}`);
  const options = result.payload?.options;
  if (!result.payload?.device || !Array.isArray(options)) {
    throw new Error(`Device ${device.id} does not contain a device and options response.`);
  }

  const modules = new Set(
    options
      .filter((option) => typeof option?.name === 'string' && option.name.trim())
      .map((option) => String(option.module_type || '').toLowerCase())
  );
  const missingModules = requiredModules.filter((moduleKey) => !modules.has(moduleKey));
  if (missingModules.length) {
    throw new Error(`Device ${device.id} is missing required modules: ${missingModules.join(', ')}`);
  }

  results.push({
    id: device.id,
    name: result.payload.device.name,
    source: result.source,
    optionCount: options.length,
    requiredModuleCount: requiredModules.length
  });
}

console.log(JSON.stringify({
  ok: true,
  origin: endpointOrigin,
  deviceCount: results.length,
  requiredModules,
  devices: results
}, null, 2));
