# Vitta - Fitness & Health App

Vitta é um aplicativo fitness completo desenvolvido em React Native com TypeScript que permite aos usuários monitorar sua saúde e bem-estar de forma integrada. O app oferece controle personalizado de atividades físicas e acesso a uma ampla base de receitas saudáveis e informações nutricionais através da integração com APIs públicas.

## 🏃‍♂️ Funcionalidades

- **Controle de Saúde**: Monitore suas atividades físicas, peso, medidas e progresso geral
- **Receitas Saudáveis**: Acesso a milhares de receitas através da API Spoonacular
- **Informações Nutricionais**: Dados detalhados de alimentos e nutrição via API Nutritionix
- **Interface Intuitiva**: Design moderno e responsivo com Material Design
- **Sincronização em Nuvem**: Dados salvos e sincronizados via Firebase
- **Navegação Fluida**: Transições suaves entre telas

## 🛠️ Tecnologias Utilizadas

- **React Native**: Framework principal para desenvolvimento mobile multiplataforma
- **TypeScript**: Linguagem principal utilizada, proporcionando tipagem estática e maior segurança no desenvolvimento
- **React Native Paper**: Componentes de UI seguindo as diretrizes do Material Design
- **React Navigation**: Sistema de navegação robusto para transições entre telas
- **Firebase**: Backend-as-a-Service para autenticação, banco de dados e sincronização
- **Spoonacular API**: Integração com API pública para dados de receitas e informações culinárias
- **Nutritionix API**: API para dados nutricionais detalhados de alimentos e ingredientes

## 🚀 Começando

Este projeto foi criado usando [**React Native**](https://reactnative.dev) com [`@react-native-community/cli`](https://github.com/react-native-community/cli).

### Pré-requisitos

Certifique-se de ter completado as instruções de [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) até o passo "Creating a new application" antes de prosseguir.

### Passo 1: Iniciar o Metro Server

Primeiro, você precisa iniciar o **Metro**, o _bundler_ JavaScript que acompanha o React Native.

Para iniciar o Metro, execute o seguinte comando na _raiz_ do projeto:

```bash
# usando npm
npm start

# OU usando Yarn
yarn start
```

### Passo 2: Iniciar a Aplicação

Mantenha o Metro Bundler rodando em seu _próprio_ terminal. Abra um _novo_ terminal na _raiz_ do projeto React Native e execute o comando para iniciar o app no _Android_ ou _iOS_:

#### Para Android

```bash
# usando npm
npm run android

# OU usando Yarn
yarn android
```

#### Para iOS

```bash
# usando npm
npm run ios

# OU usando Yarn
yarn ios
```

Se tudo estiver configurado _corretamente_, você verá o app rodando no seu _Android Emulator_ ou _iOS Simulator_ em breve, desde que tenha configurado seu emulador/simulador corretamente.

Esta é uma forma de rodar o app — você também pode executá-lo diretamente pelo Android Studio e Xcode respectivamente.

### Passo 3: Modificando o App

Agora que você executou o app com sucesso, vamos modificá-lo.

1. Abra `App.tsx` no seu editor de texto preferido e edite algumas linhas.
2. Para **Android**: Pressione a tecla <kbd>R</kbd> duas vezes ou selecione **"Reload"** no **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (no Windows e Linux) ou <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (no macOS)) para ver suas mudanças!

   Para **iOS**: Pressione <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> no seu iOS Simulator para recarregar o app e ver suas mudanças!

## 🎉 Parabéns!

Você executou e modificou com sucesso seu App React Native! 🎉

### E agora?

- Se você quiser adicionar este código React Native a uma aplicação existente, confira o [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- Se você está curioso para aprender mais sobre React Native, confira a [Introduction to React Native](https://reactnative.dev/docs/getting-started).

## 📱 Configuração das APIs

### Spoonacular API
Para utilizar as funcionalidades de receitas, você precisará:
1. Criar uma conta em [Spoonacular](https://spoonacular.com/food-api)
2. Obter sua API key gratuita
3. Configurar a chave no arquivo de configuração do projeto

### Nutritionix API
Para acessar dados nutricionais detalhados:
1. Registre-se em [Nutritionix](https://www.nutritionix.com/business/api)
2. Obtenha suas credenciais de API (App ID e App Key)
3. Configure as credenciais no arquivo de configuração

### Firebase
Para configurar o Firebase:
1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Configure a autenticação e o Firestore Database
3. Baixe o arquivo de configuração (`google-services.json` para Android e `GoogleService-Info.plist` para iOS)
4. Adicione os arquivos nas respectivas pastas do projeto

## 🔧 Solução de Problemas

Se você não conseguir fazer funcionar, veja a página de [Troubleshooting](https://reactnative.dev/docs/troubleshooting).

## 📚 Saiba Mais

Para aprender mais sobre React Native, dê uma olhada nos seguintes recursos:

- [React Native Website](https://reactnative.dev) - aprenda mais sobre React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - uma **visão geral** do React Native e como configurar seu ambiente.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - um **tour guiado** dos **conceitos básicos** do React Native.
- [Blog](https://reactnative.dev/blog) - leia os **posts** mais recentes do **Blog** oficial do React Native.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - o **repositório** Open Source no GitHub para React Native.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

Desenvolvido com ❤️ para uma vida mais saudável