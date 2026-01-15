/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import { createInertiaApp } from '@inertiajs/svelte'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { mount } from 'svelte'
import '../app.css'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => (title ? `${title} - ${appName}` : appName),

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.svelte`, import.meta.glob('../pages/**/*.svelte'))
  },

  setup({ el, App, props }) {
    mount(App, { target: el!, props })
  },
})
