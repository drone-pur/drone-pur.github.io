/* 手动换例子：修改对应任务的 images、question、answer。详见 EXAMPLES_GUIDE.md。
 * 图片放入 assets/，src 只写文件名；保留 id、dimension、title。 */
window.DRONE_PUR_CASES = [
  {
    "id": "od",
    "dimension": "perception",
    "title": "Object Detection",
    "images": [
      {
        "src": "case-od.webp",
        "label": "RGB image · target boxes shown"
      }
    ],
    "question": "Detect all the red cars in the scene.",
    "answer": "[[0.4341, 0.2881, 0.4822, 0.3153], …]"
  },
  {
    "id": "or",
    "dimension": "perception",
    "title": "Object Recognition",
    "images": [
      {
        "src": "case-or.webp",
        "label": "RGB image · designated target marked"
      }
    ],
    "question": "What are the vehicle type, cargo feature, seat color, and rider status of the target?",
    "answer": "A motorized tricycle with a blue open cargo bed, a black driver’s seat cushion, and no rider currently mounted."
  },
  {
    "id": "oc",
    "dimension": "perception",
    "title": "Object Counting",
    "images": [
      {
        "src": "case-oc.webp",
        "label": "RGB image"
      }
    ],
    "question": "How many white cars are there?",
    "answer": "45"
  },
  {
    "id": "mig",
    "dimension": "perception",
    "title": "Multi-Image Grounding",
    "images": [
      {
        "src": "case-mig-1.webp",
        "label": "Frame 1 · reference"
      },
      {
        "src": "case-mig-2.webp",
        "label": "Frame 2"
      },
      {
        "src": "case-mig-3.webp",
        "label": "Frame 3"
      },
      {
        "src": "case-mig-4.webp",
        "label": "Frame 4 · query"
      }
    ],
    "question": "Where is the person in the marked box of frame 1 located in frame 4?",
    "answer": "[0.4664, 0.4736, 0.4836, 0.5111]"
  },
  {
    "id": "cj",
    "dimension": "understanding",
    "title": "Conditional Judgment",
    "images": [
      {
        "src": "case-cj.webp",
        "label": "RGB image · referenced region marked"
      }
    ],
    "question": "To the right of the flatbed truck with a green-and-black cab parked on the left side of the elevated tracks, are there two cars with their front hoods open?",
    "answer": "Yes."
  },
  {
    "id": "psj",
    "dimension": "understanding",
    "title": "Position Spatial Judgment",
    "images": [
      {
        "src": "case-psj.webp",
        "label": "RGB image · referenced vehicles marked"
      }
    ],
    "question": "What is the position of the black car relative to the white van?",
    "answer": "The black car is at a higher vertical position and to the front left of the van."
  },
  {
    "id": "vg",
    "dimension": "understanding",
    "title": "Visual Grounding",
    "images": [
      {
        "src": "case-vg.webp",
        "label": "RGB image · reference target marked"
      }
    ],
    "question": "Where is the person wearing a red hat, a mask, and a long brown coat?",
    "answer": "[0.5192, 0.6420, 0.5405, 0.7265]"
  },
  {
    "id": "cr",
    "dimension": "reasoning",
    "title": "Causal Reasoning",
    "images": [
      {
        "src": "case-cr.webp",
        "label": "RGB image"
      }
    ],
    "question": "Why are all the waterfowl concentrated in the small pond rather than in the larger adjacent canal?",
    "answer": "A low green enclosure barrier physically confines the birds to the managed pond, keeping them from the open canal."
  },
  {
    "id": "si",
    "dimension": "reasoning",
    "title": "Situational Inference",
    "images": [
      {
        "src": "case-si.webp",
        "label": "RGB image"
      }
    ],
    "question": "What activity is this group of people clustered at the gap in the central brick wall engaged in?",
    "answer": "These people are climbing over the wall to enter the restricted area to swim or play in the water."
  },
  {
    "id": "mmr",
    "dimension": "reasoning",
    "title": "Multimodal Reasoning",
    "images": [
      {
        "src": "case-mmr-rgb.webp",
        "label": "RGB"
      },
      {
        "src": "case-mmr-tir.webp",
        "label": "Thermal infrared"
      }
    ],
    "question": "Explain the thermal features of the right white vehicle among the two parked side by side at the bottom of the intersection.",
    "answer": "Low temperatures keep its body uniformly cold, but high cabin heating makes the windows appear brighter."
  },
  {
    "id": "mvr",
    "dimension": "reasoning",
    "title": "Multi-view Reasoning",
    "images": [
      {
        "src": "case-mvr-1.webp",
        "label": "UAV view 1"
      },
      {
        "src": "case-mvr-2.webp",
        "label": "UAV view 2"
      }
    ],
    "question": "How can the leftmost pedestrian in white in View 1 reach the only visible parked car in View 2? Describe the route using the spatial relationships in View 1.",
    "answer": "Turn around from the current position, then turn right. Go straight between the two landscaped lawns, and the car will be on her own left."
  }
];
