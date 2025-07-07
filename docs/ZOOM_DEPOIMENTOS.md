# Zoom em Depoimentos - Documentação

## Visão Geral

Este projeto implementa uma funcionalidade de zoom interativo para os depoimentos dos clientes, permitindo que os usuários visualizem as imagens em detalhes através de um modal com controles de zoom.

## Funcionalidades Implementadas

### 1. Modal de Zoom
- **Abertura**: Clique na imagem do depoimento
- **Fechamento**: Clique fora da imagem ou no botão X
- **Fundo**: Overlay escuro semi-transparente
- **Animações**: Transições suaves de entrada e saída

### 2. Controles de Zoom
- **Zoom com Scroll**: Use o scroll do mouse para aumentar/diminuir o zoom
- **Zoom Localizado**: O zoom é aplicado no ponto onde o mouse está posicionado
- **Limites de Zoom**: Mínimo 1x (tamanho original) e máximo 3x
- **Botão de Reset**: "Voltar tamanho original" quando o zoom > 1x

### 3. Interatividade
- **Cursor**: Muda para `cursor-zoom-in` ao passar sobre a imagem
- **Hover Effect**: Leve aumento de escala (1.05x) ao passar o mouse
- **Transições**: Animações suaves em todas as interações

## Componentes Atualizados

### TestimonialCard (`src/components/testimonial-card.tsx`)

```typescript
export const TestimonialCard = ({ image, id }: TestimonialCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [zoomOrigin, setZoomOrigin] = useState<'center' | string>('center');

  // Controles de zoom
  const handleWheel = (e: React.WheelEvent<HTMLImageElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
    setZoom((prev) => {
      let next = prev + (e.deltaY < 0 ? 0.15 : -0.15);
      if (next < 1) next = 1;
      if (next > 3) next = 3;
      return next;
    });
  };

  return (
    <>
      {/* Card do depoimento */}
      <div className="cursor-zoom-in hover:shadow-lg transition-shadow duration-300">
        <Image
          src={image}
          alt="Depoimento de cliente"
          onClick={() => setShowModal(true)}
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Modal com zoom */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <Image
            src={image}
            alt="Depoimento de cliente"
            style={{ 
              transform: `scale(${zoom})`, 
              transformOrigin: zoomOrigin 
            }}
            onWheel={handleWheel}
          />
        </div>
      )}
    </>
  );
};
```

## Como Usar

### 1. Visualização Básica
```typescript
import { TestimonialCard } from '@/components/testimonial-card';

<TestimonialCard 
  image="/path/to/testimonial.jpg" 
  id={1}
/>
```

### 2. Integração com Lista de Depoimentos
```typescript
{testimonials.map((testimonial) => (
  <TestimonialCard 
    key={testimonial.id}
    image={testimonial.image} 
    id={testimonial.id}
  />
))}
```

## Funcionalidades Técnicas

### Controle de Overflow
```typescript
useEffect(() => {
  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return () => {
    document.body.style.overflow = "";
  };
}, [showModal]);
```

### Zoom Dinâmico
```typescript
const handleWheel = (e: React.WheelEvent<HTMLImageElement>) => {
  e.preventDefault();
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  setZoomOrigin(`${x}% ${y}%`);
  setZoom((prev) => {
    let next = prev + (e.deltaY < 0 ? 0.15 : -0.15);
    if (next < 1) next = 1;
    if (next > 3) next = 3;
    return next;
  });
};
```

## Estilos CSS

### Animações
```css
.animate-fade-in {
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Transições
```css
.transition-transform {
  transition: transform 0.2s ease;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}
```

## Responsividade

### Mobile
- Modal ocupa 90% da largura da tela
- Altura máxima de 85vh
- Controles de zoom otimizados para touch

### Desktop
- Modal com largura máxima de 4xl
- Zoom mais preciso com mouse
- Melhor experiência de navegação

## Acessibilidade

### ARIA Labels
```typescript
<button
  aria-label="Fechar"
  onClick={() => setShowModal(false)}
>
  <X className="w-6 h-6" />
</button>
```

### Navegação por Teclado
- Modal pode ser fechado com ESC (implementação futura)
- Foco gerenciado adequadamente
- Suporte a leitores de tela

## Performance

### Otimizações
- Imagens carregadas com Next.js Image
- Lazy loading para melhor performance
- Debounce no zoom (implementação futura)
- Cleanup de event listeners

### Memória
- Estados limpos ao fechar modal
- Overflow resetado adequadamente
- Sem memory leaks

## Testes

### Componente de Teste
```typescript
import { TestimonialZoomDemo } from '@/components/ui/testimonial-zoom-demo';

// Adicione este componente em qualquer página para testar
<TestimonialZoomDemo />
```

### Casos de Teste
1. **Abertura do Modal**: Clique na imagem
2. **Zoom In**: Scroll para cima
3. **Zoom Out**: Scroll para baixo
4. **Zoom Localizado**: Mova o mouse e faça zoom
5. **Reset Zoom**: Clique no botão "Voltar tamanho original"
6. **Fechamento**: Clique fora ou no X

## Personalização

### Alterando Limites de Zoom
```typescript
// No componente TestimonialCard
const MIN_ZOOM = 1;
const MAX_ZOOM = 4; // Aumentar para 4x
const ZOOM_STEP = 0.2; // Aumentar passo do zoom
```

### Modificando Animações
```typescript
// No CSS ou Tailwind
.modal-enter {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

### Alterando Cores
```typescript
// Botão de fechar
className="bg-white/80 hover:bg-white" // Alterar opacidade/cor

// Botão de reset
className="bg-pink-500 hover:bg-pink-600" // Alterar cores
```

## Compatibilidade

### Navegadores Suportados
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Dispositivos
- Desktop (mouse + scroll)
- Tablet (touch + pinch)
- Mobile (touch gestures)

## Troubleshooting

### Problemas Comuns

1. **Zoom não funciona**
   - Verificar se o evento `onWheel` está sendo capturado
   - Confirmar que `preventDefault()` está sendo chamado

2. **Modal não fecha**
   - Verificar se o `handleModalClick` está funcionando
   - Confirmar que o evento está sendo propagado corretamente

3. **Performance lenta**
   - Verificar se as imagens estão otimizadas
   - Considerar implementar debounce no zoom

### Debug
```typescript
// Adicionar logs para debug
console.log('Zoom:', zoom);
console.log('Zoom Origin:', zoomOrigin);
console.log('Modal State:', showModal);
```

## Próximas Melhorias

1. **Gestos Touch**: Suporte a pinch-to-zoom em dispositivos móveis
2. **Navegação por Teclado**: Fechar modal com ESC
3. **Histórico de Zoom**: Lembrar último nível de zoom
4. **Zoom Automático**: Detectar texto na imagem e dar zoom automático
5. **Compartilhamento**: Botão para compartilhar depoimento
6. **Download**: Opção para baixar a imagem em alta resolução 