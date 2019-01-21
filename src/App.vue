<template>
  <router-view/></template>
<script>

export default {
  name: 'app',
}
</script>

<style lang="scss">
  div {
    border: 0;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body {
    height: 100%;
    margin: 0;
    box-sizing: border-box;
  }

  body {
      font-family: 'Kalam', cursive;
      color: #333;
      display: flex;
  }

  a {
    color: #42b983;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  h1,h2,h3,h4 {
      font-family: 'Scope One', serif;
  }

  iframe {
    height: 100%;
    width: 100%;
  }

  .qr-code {
    text-align: center;
    padding: 1rem;
  }

  .wrapper {
      text-align: left;
      max-width: 500px;
      margin: auto;
  }

  .pass-entry {
      text-align: center;
  }
  .pass-entry input {
      box-sizing: border-box;
      width: 100%;
      font-size: 30px;
      padding: 10px;
      text-align: center;
  }
  .pass-entry input.complete {
      color: green;
  }

  #guess-list {
      list-style: none;
  }

  .outer-flex {
    display: flex;
    height: 100%;
    width: 100%;
  }

  .flex-left {
    flex: 0 1 50%;
    height: 100%;
    max-width: 50%;
    overflow-y: scroll;
    padding: 2em;
  }

  .flex-right {
    flex: 0 1 50%;
    height: 100%;
    max-width: 50%;
    padding: 2em;
  }

  .button {
      background-color: #42b983; /* Green */
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 30px;
      margin-bottom: 20px;
      box-sizing: border-box;
      width: 100%;
      cursor: pointer;
  }
</style>
