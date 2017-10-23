// @flow
import validate from './utils/validate'
import { createStore } from './utils/store'
import { createPlugins, initPlugins } from './core'
import corePlugins from './plugins'

const validateConfig = (config: $config) =>
  validate([
    [
      !!config.plugins && !Array.isArray(config.plugins),
      'init config.plugins must be an array',
    ],
    [
      !!config.middleware && !Array.isArray(config.middleware),
      'init config.middleware must be an array',
    ],
    [
      !!config.extraReducers && (Array.isArray(config.extraReducers) || typeof config.extraReducers !== 'object'),
      'init config.extraReducers must be an object',
    ],
  ])

const init = (config: $config = {}): void => {
  validateConfig(config)
  // setup plugin pipeline
  const plugins = corePlugins.concat(config.plugins || [])
  createPlugins(plugins)
  // create a redux store with initialState
  // merge in additional extra reducers
  createStore(config.initialState, config.extraReducers)
  // run init after completed
  initPlugins(plugins)
}

export default init