# Passo a passo final para colocar o RotaSegura online

## 1. Requisitos
- Node.js 20+;
- conta GitHub;
- conta Vercel;
- projeto Supabase;
- domínio próprio (recomendado: rotasegura.com.br ou equivalente disponível).

## 2. Banco
No Supabase, abra **SQL Editor**, cole `supabase/001_initial.sql` e execute. Depois confira Database > Tables.

## 3. Variáveis
Crie `.env.local` a partir de `.env.example` e preencha Supabase. Nunca envie `.env.local` ao GitHub.

## 4. Teste local
```bash
npm install
npm run dev
```
Teste `/dashboard`, `/planejar`, `/monitoramento`, `/ocorrencias` e `/app-motorista`.

## 5. Build antes de publicar
```bash
npm run build
npm start
```
Só publique se o build terminar sem erro.

## 6. GitHub
```bash
git init
git add .
git commit -m "RotaSegura 1.0 beta"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

## 7. Vercel
- Vercel > Add New > Project;
- importe o GitHub;
- confirme Next.js;
- adicione as mesmas Environment Variables;
- clique Deploy.

## 8. Domínio
Settings > Domains > adicione o domínio. A Vercel mostrará os registros DNS. Configure-os no provedor do domínio e aguarde a validação HTTPS.

## 9. Instalar como aplicativo
- Android/Chrome: menu > **Instalar app**;
- iPhone/iPad/Safari: Compartilhar > **Adicionar à Tela de Início**;
- Windows/Chrome/Edge: ícone **Instalar** na barra de endereço.

## 10. Antes de abrir para transportadoras
- implementar login e sessão real;
- associar todas as consultas a uma organização;
- revisar RLS;
- ativar MFA administrativo;
- trocar serviços públicos de demonstração por provedores com SLA ou infraestrutura própria;
- implementar feeds oficiais DAER/DNIT/INMET/CEMADEN/Defesa Civil conforme API/convênio disponível;
- implantar monitoramento e alertas de erro;
- executar pentest;
- publicar Termos de Uso e Política de Privacidade/LGPD;
- teste controlado com poucos motoristas antes de uso operacional.
