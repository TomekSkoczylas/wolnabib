Wolna Biblioteka App 
====================

Aplikacja do dzielenia się opiniami na temat książek z Wolnej Biblioteki. 

## Wymagania

- NodeJS >= 15.6
- npm >= 6.14

## Przygotowanie aplikacji w wersji produkcyjnej

```bash
npm install
cp .env-example .env
edit .env # uzupełnij wartości
npm run build
```

## Deployment na środowisko produkcyjne - czytelnia.wolnabiblioteka.pl

1. Utwórz merge request z brancza głównego `master` do `release`
2. Zatwierdź merge request

## Demo

[demo] (https://wolnabiblioteka.netlify.app/)

## Użyty stack technologiczny

- [react-router] (https://www.npmjs.com/package/react-router)
- [React Icons] (https://www.npmjs.com/package/react-icons)
- [react-star-rating-controlled-component](https://www.npmjs.com/package/react-star-rating-controlled-component)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
