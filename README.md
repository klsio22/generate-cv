# **Curriculum Generator**

> **Aplicação web para criação, edição e exportação de currículos profissionais no padrão ABNT**, com preview em tempo real e exportação em PDF.

🚀 **Demo ao vivo:** [generate-curriculum-professional.vercel.app](https://generate-curriculum-professional.vercel.app/)

---

## **✨ Funcionalidades Principais**

| Recurso | Descrição |
|---------|-----------|
| **Editor Inteligente** | Formulário com validação em tempo real e persistência local (localStorage) |
| **Preview ABNT A4** | Visualização fiel do currículo no formato A4 brasileiro |
| **Exportação PDF** | Geração de PDF profissional pronto para impressão ou envio |
| **Múltiplos Currículos** | Criar, duplicar e gerenciar várias versões de currículo |
| **Design Responsivo** | Interface adaptável com Tailwind CSS e DaisyUI |

---

## **🛠️ Stack Tecnológico**

```
React 19 .................. Biblioteca UI moderna com hooks
TypeScript 5.9 ............ Tipagem estática para código robusto
Vite ...................... Build tool rápido e otimizado
Tailwind CSS + DaisyUI .... Estilização utilitária e componentes
React Hook Form ........... Gerenciamento de formulários performático
@react-pdf/renderer ....... Geração de PDF server-side no browser
react-to-print ............ API de impressão nativa do navegador
Lucide React .............. Ícones modernos e consistentes
```

> 📦 Veja `package.json` para versões exatas e dependências.

---

## **🚀 Começando**

### **Desenvolvimento local**

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/curriculum-generator.git

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### **Build de produção**

```bash
# Gera build otimizada
npm run build

# Preview local do build de produção
npm run preview
```

---

## **📁 Estrutura do Projeto**

```
src/
├── components/
│   ├── CVForm.tsx ............... Formulário de edição do currículo
│   ├── PDFPreview.tsx ........... Preview A4 + componente de PDF
│   └── Sidebar.tsx .............. Lista e gerenciamento de currículos
├── App.tsx
├── main.tsx
├── index.css
├── types.ts
├── assets/
├── components/
│   ├── CVDocument.tsx ........... Documento PDF / export
│   ├── CVForm.tsx ............... Formulário de edição do currículo
│   ├── Modal.tsx ................ Componente de diálogos
│   ├── PDFPreview.tsx ........... Preview A4 + componente de PDF
│   └── Sidebar.tsx .............. Lista e gerenciamento de currículos
├── data/
│   └── defaultCV.ts ............. Dados iniciais do currículo
├── hooks/
│   └── useCVStorage.ts .......... Persistência local (CRUD completo)
├── styles/
│   └── pdfStyles.ts ............. Estilos específicos para PDF
├── utils/
│   └── textUtils.ts ............. Utilitários de formatação (datas, URLs)
```

---

## **🌐 Deploy**

### **Vercel (recomendado)**

1. Conecte seu repositório GitHub na [Vercel](https://vercel.com)
2. **Variáveis de ambiente:** Nenhuma necessária
3. **Build command:** `npm run build` (detectado automaticamente)

### **Deploy manual via CLI**

```bash
npm run build
vercel --prod
```

---

## **⚙️ Personalização**

| Arquivo | O que editar |
|---------|--------------|
| `src/styles/pdfStyles.ts` | Margens, fontes e espaçamento do PDF |
| `src/data/defaultCV.ts` | Dados iniciais do currículo padrão |

---

## **📄 Licença**

MIT © 2024 Klésio

---

## **🔗 Links**

- 🌐 **Demo:** [generate-curriculum-professional.vercel.app](https://generate-curriculum-professional.vercel.app/)
- 💼 **Portfólio:** [klesio-dev.vercel.app](https://klesio-dev.vercel.app/)
- 💻 **GitHub:** [github.com/klsio22](https://github.com/klsio22)