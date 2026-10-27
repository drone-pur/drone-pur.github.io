/* Add the verified public URL for each resource when released. */
window.DRONE_PUR_RESOURCES = {
  paper: { label: 'Paper', platform: 'arXiv', badge: 'Coming soon', url: null, fallbackUrl: './assets/drone-pur-paper.pdf', note: 'The arXiv link will be added when available. You can read the current manuscript below.' },
  code: { label: 'Code', platform: 'GitHub', badge: 'Code', url: null, note: 'Evaluation and training code will be released on GitHub.' },
  models: { label: 'Model weights', platform: 'ModelScope', badge: 'Weights', url: null, note: 'UAV-PUR-4B and UAV-PUR-8B checkpoints will be released on ModelScope.' },
  benchmark: { label: 'Benchmark', platform: 'ModelScope', badge: 'Benchmark', url: null, note: 'The Drone-PUR evaluation benchmark will be released on ModelScope.' },
  training: { label: 'Training source', platform: 'ModelScope', badge: 'Training source', url: null, note: 'The Drone-PUR training sources will be released on ModelScope.' }
};
