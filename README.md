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

# w katalogu build pojawią się statyczne pliki do uploadu na serwer
```

## Uruchamianie lokalne aplikacji w wersji deweloperskiej

![Build on each commit to check if application still builds](https://github.com/TomekSkoczylas/wolnabib/workflows/Build%20on%20each%20commit%20to%20check%20if%20application%20still%20builds/badge.svg)

```bash
npm install
npm run start
```

## Deployment na środowisko produkcyjne - czytelnia.wolnabiblioteka.pl

![Build and release a package](https://github.com/TomekSkoczylas/wolnabib/workflows/Build%20and%20release%20a%20package/badge.svg)

1. Utwórz merge request z brancza głównego `master` do `release`
2. Zatwierdź merge request

## Demo

[demo] (https://wolnabiblioteka.netlify.app/)

## Użyty stack technologiczny

- [react-router] (https://www.npmjs.com/package/react-router)
- [React Icons] (https://www.npmjs.com/package/react-icons)
- [react-star-rating-controlled-component](https://www.npmjs.com/package/react-star-rating-controlled-component)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
