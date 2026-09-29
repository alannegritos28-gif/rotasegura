# Atualização futura via GitHub

O projeto foi mantido com separação entre interface, APIs e banco. Para atualizações visuais, concentre mudanças em `app/globals.css` e `components/`. Para regras de negócio, use `app/api`, `lib` e novas migrations em `supabase/migrations`.

Fluxo recomendado:

```bash
git checkout -b feature/nome-da-alteracao
npm install
npm run dev
npm run build
git add .
git commit -m "feat: descrição"
git push -u origin feature/nome-da-alteracao
```

Abra um Pull Request para `main`. O Netlify cria Preview Deploy para revisão e publica produção apenas após merge na `main`.
