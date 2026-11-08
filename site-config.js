/* Add the verified public URL for each resource when released. */
window.DRONE_PUR_RESOURCES = {
  paper: { label: 'Paper', platform: 'arXiv', badge: 'Paper', url: 'https://arxiv.org/abs/2610.40801', fallbackUrl: null, note: 'Read the Drone-PUR paper on arXiv.' },
  code: { label: 'Code', platform: 'GitHub', badge: 'Code', url: null, note: 'Evaluation and training code will be released on GitHub.' },
  models: { label: 'Model weights', platform: 'Hugging Face', badge: 'Weights', url: 'https://huggingface.co/Henard224/models', note: 'View UAV-PUR model checkpoints on Hugging Face.'},
  benchmark: { label: 'Benchmark', platform: 'Hugging Face', badge: 'Benchmark', url: 'https://huggingface.co/datasets/Henard224/Drone-PUR-Benchmark', note: 'View the Drone-PUR evaluation benchmark on Hugging Face. Files are being uploaded.' },
  training: { label: 'Training source', platform: 'Hugging Face', badge: 'Training source', url: null, note: 'The Drone-PUR training sources will be released on Hugging Face.' }
};
