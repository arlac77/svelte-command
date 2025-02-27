[![Svelte v5](https://img.shields.io/badge/svelte-v5-orange.svg)](https://svelte.dev)
[![npm](https://img.shields.io/npm/v/svelte-command.svg)](https://www.npmjs.com/package/svelte-command)
[![License](https://img.shields.io/badge/License-0BSD-blue.svg)](https://spdx.org/licenses/0BSD.html)
[![bundlejs](https://deno.bundlejs.com/?q=svelte-command\&badge=detailed)](https://bundlejs.com/?q=svelte-command)
[![downloads](http://img.shields.io/npm/dm/svelte-command.svg?style=flat-square)](https://npmjs.org/package/svelte-command)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/svelte-command.svg?style=flat-square)](https://github.com/arlac77/svelte-command/issues)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Farlac77%2Fsvelte-command%2Fbadge\&style=flat)](https://actions-badge.atrox.dev/arlac77/svelte-command/goto)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/svelte-command/badge.svg)](https://snyk.io/test/github/arlac77/svelte-command)
[![Coverage Status](https://coveralls.io/repos/arlac77/svelte-command/badge.svg)](https://coveralls.io/github/arlac77/svelte-command)
[![Tested with TestCafe](https://img.shields.io/badge/tested%20with-TestCafe-2fa4cf.svg)](https://github.com/DevExpress/testcafe)

# svelte-command

general command execution handling for svelte components

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [BasicCommand](#basiccommand)
    *   [Parameters](#parameters)
    *   [subscribe](#subscribe)
        *   [Parameters](#parameters-1)
*   [Command](#command)
    *   [Parameters](#parameters-2)
    *   [Properties](#properties)
*   [ConfirmCommand](#confirmcommand)
    *   [Parameters](#parameters-3)
*   [FetchCommand](#fetchcommand)
    *   [Parameters](#parameters-4)
*   [handleFailedResponse](#handlefailedresponse)
    *   [Parameters](#parameters-5)

## BasicCommand

### Parameters

*   `start` &#x20;
*   `properties` &#x20;
*   `options`   (optional, default `{}`)

### subscribe

#### Parameters

*   `subscription` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)**&#x20;

## Command

**Extends BasicCommand**

### Parameters

*   `_start` &#x20;
*   `options`   (optional, default `{}`)

### Properties

*   `title` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
*   `description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
*   `shortcuts` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;
*   `disabled` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)**&#x20;
*   `active` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)**&#x20;
*   `failed` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)**&#x20;
*   `completed` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)**&#x20;

## ConfirmCommand

**Extends BasicCommand**

Ask for confirmation before execution a given Command.

### Parameters

*   `command` &#x20;

## FetchCommand

**Extends Command**

Command executing a fetch request.

### Parameters

*   `url` **any**&#x20;
*   `fetchOptions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)

## handleFailedResponse

Extract error description from response.

### Parameters

*   `response` **[Response](https://developer.mozilla.org/docs/Web/Guide/HTML/HTML5)**&#x20;

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>**&#x20;

# install

With [npm](http://npmjs.org) do:

```shell
npm install svelte-command
```

With [yarn](https://yarnpkg.com) do:

```shell
yarn add svelte-command
```

# license

BSD-2-Clause
