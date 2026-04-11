import React from 'react';
import { Button, Text, Input } from '../atoms';

/**
 * 原子組件展示頁面
 * 用於展示和測試新創建的原子組件
 */
export const AtomicComponentsDemo: React.FC = () => {
  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <Text as="h1" size="3xl" weight="bold" color="primary">
          原子組件展示
        </Text>
        <Text size="lg" color="secondary" className="mt-2">
          基於 Atomic Design 原則設計的基礎組件庫
        </Text>
      </div>

      {/* Button 組件展示 */}
      <section className="space-y-4">
        <Text as="h2" size="xl" weight="semibold">
          Button 組件
        </Text>
        
        <div className="space-y-4">
          {/* 不同變體 */}
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>

          {/* 不同大小 */}
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>

          {/* 不同顏色 */}
          <div className="flex flex-wrap gap-4">
            <Button color="primary">Primary</Button>
            <Button color="success">Success</Button>
            <Button color="warning">Warning</Button>
            <Button color="error">Error</Button>
          </div>

          {/* 不同狀態 */}
          <div className="flex flex-wrap gap-4">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button fullWidth>Full Width</Button>
          </div>

          {/* 不同動畫 */}
          <div className="flex flex-wrap gap-4">
            <Button animation="scale">Scale</Button>
            <Button animation="fade">Fade</Button>
            <Button animation="slide">Slide</Button>
            <Button animation="bounce">Bounce</Button>
          </div>
        </div>
      </section>

      {/* Text 組件展示 */}
      <section className="space-y-4">
        <Text as="h2" size="xl" weight="semibold">
          Text 組件
        </Text>
        
        <div className="space-y-4">
          {/* 不同變體 */}
          <div className="space-y-2">
            <Text variant="body">這是正文文字 (body)</Text>
            <Text variant="caption">這是說明文字 (caption)</Text>
            <Text variant="overline">這是上標文字 (overline)</Text>
          </div>

          {/* 不同大小 */}
          <div className="space-y-2">
            <Text size="xs">超小文字 (xs)</Text>
            <Text size="sm">小文字 (sm)</Text>
            <Text size="md">中等文字 (md)</Text>
            <Text size="lg">大文字 (lg)</Text>
            <Text size="xl">超大文字 (xl)</Text>
            <Text size="2xl">2XL 文字</Text>
          </div>

          {/* 不同字重 */}
          <div className="space-y-2">
            <Text weight="light">輕字重</Text>
            <Text weight="normal">正常字重</Text>
            <Text weight="medium">中等字重</Text>
            <Text weight="semibold">半粗字重</Text>
            <Text weight="bold">粗字重</Text>
          </div>

          {/* 不同顏色 */}
          <div className="space-y-2">
            <Text color="default">預設顏色</Text>
            <Text color="primary">主要顏色</Text>
            <Text color="secondary">次要顏色</Text>
            <Text color="success">成功顏色</Text>
            <Text color="warning">警告顏色</Text>
            <Text color="error">錯誤顏色</Text>
            <Text color="muted">淡化顏色</Text>
          </div>

          {/* 不同對齊 */}
          <div className="space-y-2">
            <Text align="left">左對齊文字</Text>
            <Text align="center">置中對齊文字</Text>
            <Text align="right">右對齊文字</Text>
          </div>

          {/* 文字效果 */}
          <div className="space-y-2">
            <Text decoration="underline">底線文字</Text>
            <Text decoration="line-through">刪除線文字</Text>
            <Text transform="uppercase">大寫文字</Text>
            <Text transform="capitalize">首字母大寫文字</Text>
            <Text truncate className="w-48">
              這是一段很長的文字，會被截斷顯示省略號
            </Text>
          </div>
        </div>
      </section>

      {/* Input 組件展示 */}
      <section className="space-y-4">
        <Text as="h2" size="xl" weight="semibold">
          Input 組件
        </Text>
        
        <div className="space-y-4 max-w-md">
          {/* 不同變體 */}
          <div className="space-y-4">
            <Input 
              label="Filled 輸入框"
              variant="filled" 
              placeholder="請輸入內容"
            />
            <Input 
              label="Outlined 輸入框"
              variant="outlined" 
              placeholder="請輸入內容"
            />
            <Input 
              label="Ghost 輸入框"
              variant="ghost" 
              placeholder="請輸入內容"
            />
            <Input 
              label="Underlined 輸入框"
              variant="underlined" 
              placeholder="請輸入內容"
            />
          </div>

          {/* 不同大小 */}
          <div className="space-y-4">
            <Input 
              label="小尺寸"
              size="sm" 
              placeholder="小尺寸輸入框"
            />
            <Input 
              label="中等尺寸"
              size="md" 
              placeholder="中等尺寸輸入框"
            />
            <Input 
              label="大尺寸"
              size="lg" 
              placeholder="大尺寸輸入框"
            />
          </div>

          {/* 不同類型 */}
          <div className="space-y-4">
            <Input 
              label="文字輸入"
              type="text" 
              placeholder="請輸入文字"
            />
            <Input 
              label="電子郵件"
              type="email" 
              placeholder="請輸入電子郵件"
            />
            <Input 
              label="密碼"
              type="password" 
              placeholder="請輸入密碼"
            />
            <Input 
              label="數字"
              type="number" 
              placeholder="請輸入數字"
            />
          </div>

          {/* 輔助元素 */}
          <div className="space-y-4">
            <Input 
              label="必填欄位"
              required
              placeholder="這是必填欄位"
              helperText="請確實填寫此欄位"
            />
            <Input 
              label="錯誤狀態"
              placeholder="有錯誤的輸入框"
              errorMessage="這個欄位有錯誤"
            />
            <Input 
              label="禁用狀態"
              placeholder="禁用的輸入框"
              disabled
            />
          </div>

          {/* 多行輸入 */}
          <div className="space-y-4">
            <Input 
              label="多行輸入"
              multiline
              rows={4}
              placeholder="請輸入多行內容..."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AtomicComponentsDemo;
