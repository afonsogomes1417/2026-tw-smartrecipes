### Project Notes

## SmartRecipes 🍽️

Aplicação web full-stack para descobrir, guardar e gerir receitas culinárias.

### Grupo
| Nome | Número de Aluno |
|------|----------------|
| Laurindo Gonçalo | 33054 |
| Abdulai Seidi | XXXXX |
| Afonso Gomes | XXXXX |
| Rui Passos | XXXXX |

### Funcionalidades
- 🔍 Pesquisa de receitas via TheMealDB API
- ❤️ Guardar receitas favoritas (por utilizador)
- 🧺 Dispensa inteligente — gere ingredientes em casa
- 🔐 Autenticação com JWT (login/registo)
- 📱 Interface responsiva

### Tecnologias
- **Frontend:** Angular 18
- **Backend:** NestJS + SQLite
- **API Externa:** TheMealDB (https://www.themealdb.com)
- **Autenticação:** JWT + bcrypt

### Como correr o projeto

**Frontend:**
```bash
npm install
npm start
```

**Backend:**
```bash
cd ../backend-smartrecipes
npm install
npm run start:dev
```