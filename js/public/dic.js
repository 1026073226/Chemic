const chemist = {
  acts: {
    Xe: {
      con: false,
      lvl: 0,
      xp: 0,
      added: false,
      form: false,
    },
    H: {
      con: false,
      lvl: 0,
      xp: 0,
      added: false,
      form: false,
    },
    O: {
      con: false,
      lvl: 0,
      xp: 0,
      added: false,
      form: false,
    },
    Mg: {
      con: false,
      lvl: 0,
      xp: 0,
      added: false,
      form: false,
    },
    Al: {
      con: false,
      lvl: 0,
      xp: 0,
      added: false,
      form: false,
    },
    C: {
      con: false,
      lvl: 0,
      xp: 0,
      added: false,
      form: false,
    },
  },
  equi: {
    beaker: {
      name: "烧杯",
      con: false,
      added: false,
      effect: {
        exo: 1.1,
        end: 1.1,
        suc: 10,
        prevent: [],
      },
      intro: "常见的反应容器之一，可以量取试剂，增加反应成功率，同时也可以促进试剂间充分反应，增加反应效率，但无法密封，不一定能保证实验的安全。",
    },
    flask: {
      name: "锥形瓶",
      con: false,
      added: false,
      effect: {
        exo: 1.05,
        end: 1.05,
        suc: 5,
        prevent: ["wet",
          "fog"
        ],
      },
      intro: "常见的反应容器之一，可以滴定试剂，增加反应成功率，同时也可以促进试剂间反应，增加反应效率。同时，瓶颈较长，可以防止液体在加热过程中溅出，保证实验安全。",
    },
    jjb: {
      name: "基基的杯子",
      special: true,
      intro: "除了水什么都装哦~"
    }
  },
  elements: {
    H: {
      atomic: 1,
      valence: [1,
      ]
    },
    Li: {
      atomic: 3,
      valence: [1]
    },
    C: {
      atomic: 6,
      valence: [2,
        4,
        -2,
        -4
      ]
    },
    N: {
      atomic: 7,
      valence: [1,
        2,
        3,
        4,
        5,
        -3
      ]
    },
    O: {
      atomic: 8,
      valence: [-2]
    },
    F: {
      atomic: 9,
      valence: [-1]
    },
    Na: {
      atomic: 11,
      valence: [1]
    },
    Mg: {
      atomic: 12,
      valence: [2]
    },
    Al: {
      atomic: 13,
      valence: [3]
    },
    P: {
      atomic: 15,
      valence: [5]
    },
    S: {
      atomic: 16,
      valence: [2,
        4,
        6,
        -2
      ]
    },
    Cl: {
      atomic: 17,
      valence: [-1,
        5
      ]
    },
    K: {
      atomic: 19,
      valence: [1]
    },
    Ca: {
      atomic: 20,
      valence: [2]
    },
    Fe: {
      atomic: 26,
      valence: [2,
        3
      ]
    },
    Cu: {
      atomic: 29,
      valence: [1,
        2
      ]
    },
    Ag: {
      atomic: 47,
      valence: [1]
    },
    Au: {
      atomic: 79,
      valence: [1,
        3
      ]
    },
    Hg: {
      atomic: 80,
      valence: [1,
        2
      ]
    },
    Ba: {
      atomic: 56,
      valence: [2]
    },
    Zn: {
      atomic: 30,
      valence: [2]
    },
    Mn: {
      atomic: 25,
      valence: [4,
        6,
        7
      ]
    },
    Cr: {
      atomic: 24,
      valence: [3]
    },
    Pb: {
      atomic: 82,
      valence: [2]
    },
    Pt: {
      atomic: 78,
      valence: [2,
        4
      ]
    },
    Sn: {
      atomic: 50,
      valence: [2,
        4
      ]
    },
    U: {
      atomic: 92,
      valence: [4,
        6
      ]
    },
    Si: {
      atomic: 14,
      valence: [4]
    },
    I: {
      atomic: 53,
      valence: [-1]
    },
    Xe: {
      atomic: 54,
      valence: [NaN]
    },
    "OH": {
      atomic: 9,
      valence: [-1],
    },
    "CO<sub>3</sub>": {
      atomic: 30,
      valence: [-2],
    },
    "SO<sub>4</sub>": {
      atomic: 48,
      valence: [-2],
    },
    "NO<sub>3</sub>": {
      atomic: 31,
      valence: [-1],
    },
    "NH<sub>4</sub>": {
      atomic: 11,
      valence: [1],
    },
  },
  env: {
    heat: {
      name: "🔥加热",
      icon: "🌡️",
      effect: {
        exo: 1.3,
        end: 0.8,
        suc: [10,
          -20
        ]
      },
      cost: "C<sub>2</sub>H<sub>5</sub>OH",
      dur: 3
    },
    cold: {
      name: "🧊降温",
      icon: "️❄️",
      effect: {
        exo: 0.8,
        end: 1.3,
        suc: [-20,
          10
        ]
      },
      cost: "NH<sub>4</sub>NO<sub>3</sub>",
      dur: 3
    },
    wet: {
      name: "🚿潮湿",
      icon: "💧",
      effect: {
        exo: 0.9,
        end: 1.05,
        suc: [-10,
          5
        ],
      },
      cost: "H<sub>2</sub>O",
      dur: 2,
    },
    catal: {
      name: "⚗️催化剂",
      icon: "🧪",
      effect: {
        exo: 1.1,
        end: 1.2,
        suc: [20,
          20
        ]
      },
      cost: "MnO<sub>2</sub>",
      dur: 2
    },
    fog: {
      name: "🌫️烟雾",
      icon: "️☁️",
      effect: {
        exo: 1,
        end: 1,
        suc: [-20,
          -20
        ]
      },
      cost: "P<sub>2</sub>O<sub>5</sub>",
      dur: 2
    },
    rad: {
      name: "☢️辐射",
      icon: "️️☢️",
      effect: {
        exo: 1.5,
        end: 1.5,
        suc: [-50,
          -50
        ]
      },
      cost: "U",
      dur: 1
    },
  },
  sub: {
    H: "H<sub>2</sub>",
    C: "C",
    N: "N<sub>2</sub>",
    O: "O<sub>2</sub>",
    OOO: "O<sub>3</sub>",
    Na: "Na",
    Mg: "Mg",
    Al: "Al",
    P: "P",
    S: "S",
    Cl: "Cl<sub>2</sub>",
    K: "K",
    Ca: "Ca",
    Fe: "Fe",
    Cu: "Cu",
    Ag: "Ag",
    Au: "Au",
    Hg: "Hg",
    Ba: "Ba",
    Zn: "Zn",
    Mn: "Mn",
    Sn: "Sn",
    Si: "Si",
    Pt: "Pt",
    Pb: "Pb",
    Cr: "Cr",
    I: "I<sub>2</sub>",
    Li: "Li",
    Xe: "Xe",
    U: "U",
    F: "F<sub>2</sub>",
    OH: "H<sub>2</sub>O<sub>2</sub>",
  },
  x: [ {
    "f": {
      "H<sub>2</sub>": 2,
      "O<sub>2</sub>": 1
    },
    "t": {
      "H<sub>2</sub>O": 2
    },
    "y": -147
  },
    {
      "f": {
        "CO<sub>2</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "t": {
        "H<sub>2</sub>CO<sub>3</sub>": 1
      },
      "y": -124 // 原值为 62，修正为 -62（放热反应）
    },
    {
      "f": {
        "SO<sub>2</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "t": {
        "H<sub>2</sub>SO<sub>3</sub>": 1
      },
      "y": -82 // 原值为 82，修正为 -82（放热反应）
    },
    {
      "f": {
        "CaO": 1,
        "H<sub>2</sub>O": 1
      },
      "t": {
        "Ca(OH)<sub>2</sub>": 1
      },
      "y": -148 // 原值为 74，修正为 -74（放热反应）
    },
    {
      "f": {
        "Na<sub>2</sub>CO<sub>3</sub>": 1,
        "H<sub>2</sub>O": 1,
        "CO<sub>2</sub>": 1
      },
      "t": {
        "NaHCO<sub>3</sub>": 2
      },
      "y": -168 // 原值为 168，修正为 -168（放热反应）
    },
    {
      "f": {
        "H<sub>2</sub>O": 2
      },
      "t": {
        "H<sub>2</sub>": 2,
        "O<sub>2</sub>": 1
      },
      "y": 136
    },
    {
      "f": {
        "H<sub>2</sub>CO<sub>3</sub>": 1
      },
      "t": {
        "H<sub>2</sub>O": 1,
        "CO<sub>2</sub>": 1
      },
      "y": 120
    },
    {
      "f": {
        "C": 1,
        "CuO": 2
      },
      "t": {
        "Cu": 2,
        "CO<sub>2</sub>": 1
      },
      "y": 160
    },
    {
      "f": {
        "C": 3,
        "Fe<sub>2</sub>O<sub>3</sub>": 2
      },
      "t": {
        "Fe": 4,
        "CO<sub>2</sub>": 3
      },
      "y": 264
    },
    {
      "f": {
        "H<sub>2</sub>": 1,
        "CuO": 1
      },
      "t": {
        "Cu": 1,
        "H<sub>2</sub>O": 1
      },
      "y": 98
    },
    {
      "f": {
        "H<sub>2</sub>": 3,
        "Fe<sub>2</sub>O<sub>3</sub>": 1
      },
      "t": {
        "Fe": 2,
        "H<sub>2</sub>O": 3
      },
      "y": 108
    },
    {
      "f": {
        "CO<sub>2</sub>": 1,
        "Ca(OH)<sub>2</sub>": 1
      },
      "t": {
        "CaCO<sub>3</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "y": 100
    },
    {
      "f": {
        "CO<sub>2</sub>": 1,
        "NaOH": 2
      },
      "t": {
        "Na<sub>2</sub>CO<sub>3</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "y": -168
    },
    {
      "f": {
        "SO<sub>2</sub>": 1,
        "NaOH": 2
      },
      "t": {
        "Na<sub>2</sub>SO<sub>3</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "y": -126
    },
    {
      "f": {
        "CO": 1,
        "CuO": 1
      },
      "t": {
        "Cu": 1,
        "CO<sub>2</sub>": 1
      },
      "y": 108
    },
    {
      "f": {
        "CO": 3,
        "Fe<sub>2</sub>O<sub>3</sub>": 1
      },
      "t": {
        "Fe": 2,
        "CO<sub>2</sub>": 3
      },
      "y": 84
    },
    {
      "f": {
        "C": 1,
        "O<sub>2</sub>": 1
      },
      "t": {
        "CO<sub>2</sub>": 1
      },
      "y": -44
    },
    {
      "f": {
        "C": 2,
        "O<sub>2</sub>": 1
      },
      "t": {
        "CO": 2
      },
      "y": -56
    },
    {
      "f": {
        "S": 1,
        "O<sub>2</sub>": 1
      },
      "t": {
        "SO<sub>2</sub>": 1
      },
      "y": -64
    },
    {
      "f": {
        "P": 4,
        "O<sub>2</sub>": 5
      },
      "t": {
        "P<sub>2</sub>O<sub>5</sub>": 2
      },
      "y": -384,
      "effect": {
        key: "fog",
        cd: 1,
      }
    },
    {
      "f": {
        "Fe": 3,
        "O<sub>2</sub>": 2
      },
      "t": {
        "Fe<sub>3</sub>O<sub>4</sub>": 1
      },
      "y": -232
    },
    {
      "f": {
        "Mg": 2,
        "O<sub>2</sub>": 1
      },
      "t": {
        "MgO": 2
      },
      "y": -80
    },
    {
      "f": {
        "Al": 4,
        "O<sub>2</sub>": 3
      },
      "t": {
        "Al<sub>2</sub>O<sub>3</sub>": 2
      },
      "y": -204
    },
    {
      "f": {
        "Cu": 2,
        "O<sub>2</sub>": 1
      },
      "t": {
        "CuO": 2
      },
      "y": -160
    },
    {
      "f": {
        "CO": 2,
        "O<sub>2</sub>": 1
      },
      "t": {
        "CO<sub>2</sub>": 2
      },
      "y": -88
    },
    {
      "f": {
        "C": 1,
        "CO<sub>2</sub>": 1
      },
      "t": {
        "CO": 2
      },
      "y": 56
    },
    {
      "f": {
        "KMnO<sub>4</sub>": 2
      },
      "t": {
        "K<sub>2</sub>MnO<sub>4</sub>": 1,
        "MnO<sub>2</sub>": 1,
        "O<sub>2</sub>": 1
      },
      "y": 316
    },
    {
      "f": {
        "KClO<sub>3</sub>": 2
      },
      "t": {
        "KCl": 2,
        "O<sub>2</sub>": 3
      },
      "y": 245
    },
    {
      "f": {
        "H<sub>2</sub>O<sub>2</sub>": 2
      },
      "t": {
        "H<sub>2</sub>O": 2,
        "O<sub>2</sub>": 1
      },
      "y": 136
    },
    {
      "f": {
        "CaCO<sub>3</sub>": 1
      },
      "t": {
        "CaO": 1,
        "CO<sub>2</sub>": 1
      },
      "y": 56
    },
    {
      "f": {
        "NaHCO<sub>3</sub>": 2
      },
      "t": {
        "Na<sub>2</sub>CO<sub>3</sub>": 1,
        "CO<sub>2</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "y": 168
    },
    {
      "f": {
        "Cu<sub>2</sub>(OH)<sub>2</sub>CO<sub>3</sub>": 1
      },
      "t": {
        "CuO": 2,
        "H<sub>2</sub>O": 1,
        "CO<sub>2</sub>": 1
      },
      "y": 222
    },

    {
      "f": {
        "Fe": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "FeSO<sub>4</sub>": 1,
        "H<sub>2</sub>": 1
      },
      "y": -56
    },
    {
      "f": {
        "Zn": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "ZnSO<sub>4</sub>": 1,
        "H<sub>2</sub>": 1
      },
      "y": -97
    },
    {
      "f": {
        "Al": 2,
        "H<sub>2</sub>SO<sub>4</sub>": 3
      },
      "t": {
        "Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>": 1,
        "H<sub>2</sub>": 3
      },
      "y": -192
    },
    {
      "f": {
        "Mg": 1,
        "HCl": 2
      },
      "t": {
        "MgCl<sub>2</sub>": 1,
        "H<sub>2</sub>": 1
      },
      "y": -73
    },
    {
      "f": {
        "Al": 2,
        "HCl": 6
      },
      "t": {
        "AlCl<sub>3</sub>": 2,
        "H<sub>2</sub>": 3
      },
      "y": -219
    },
    {
      "f": {
        "Fe": 1,
        "CuSO<sub>4</sub>": 1
      },
      "t": {
        "FeSO<sub>4</sub>": 1,
        "Cu": 1
      },
      "y": -64
    },
    {
      "f": {
        "Zn": 1,
        "CuSO<sub>4</sub>": 1
      },
      "t": {
        "ZnSO<sub>4</sub>": 1,
        "Cu": 1
      },
      "y": -65
    },
    {
      "f": {
        "Cu": 1,
        "AgNO<sub>3</sub>": 2
      },
      "t": {
        "Cu(NO<sub>3</sub>)<sub>2</sub>": 1,
        "Ag": 2
      },
      "y": -344
    },
    {
      "f": {
        "CaCO<sub>3</sub>": 1,
        "HCl": 2
      },
      "t": {
        "CaCl<sub>2</sub>": 1,
        "H<sub>2</sub>O": 1,
        "CO<sub>2</sub>": 1
      },
      "y": -100
    },
    {
      "f": {
        "Na<sub>2</sub>CO<sub>3</sub>": 1,
        "Ca(OH)<sub>2</sub>": 1
      },
      "t": {
        "CaCO<sub>3</sub>": 1,
        "NaOH": 2
      },
      "y": -100
    },
    {
      "f": {
        "CuSO<sub>4</sub>": 1,
        "Ca(OH)<sub>2</sub>": 1
      },
      "t": {
        "Cu(OH)<sub>2</sub>": 1,
        "CaSO<sub>4</sub>": 1
      },
      "y": -222
    },
    {
      "f": {
        "Na<sub>2</sub>CO<sub>3</sub>": 1,
        "HCl": 2
      },
      "t": {
        "NaCl": 2,
        "H<sub>2</sub>O": 1,
        "CO<sub>2</sub>": 1
      },
      "y": -117
    },
    {
      "f": {
        "NaHCO<sub>3</sub>": 1,
        "HCl": 1
      },
      "t": {
        "NaCl": 1,
        "H<sub>2</sub>O": 1,
        "CO<sub>2</sub>": 1
      },
      "y": -168
    },
    {
      "f": {
        "Fe<sub>2</sub>O<sub>3</sub>": 1,
        "HCl": 6
      },
      "t": {
        "FeCl<sub>3</sub>": 2,
        "H<sub>2</sub>O": 3
      },
      "y": -313
    },
    {
      "f": {
        "Fe<sub>2</sub>O<sub>3</sub>": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 3
      },
      "t": {
        "Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>": 1,
        "H<sub>2</sub>O": 3
      },
      "y": -299
    },
    {
      "f": {
        "CuO": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "CuSO<sub>4</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "y": -159
    },
    {
      "f": {
        "MgO": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "MgSO<sub>4</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "y": -120
    },
    {
      "f": {
        "NaOH": 1,
        "HCl": 1
      },
      "t": {
        "NaCl": 1,
        "H<sub>2</sub>O": 1
      },
      "y": -117
    },
    {
      "f": {
        "Ca(OH)<sub>2</sub>": 1,
        "HCl": 2
      },
      "t": {
        "CaCl<sub>2</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -146
    },
    {
      "f": {
        "Fe(OH)<sub>3</sub>": 1,
        "HCl": 3
      },
      "t": {
        "FeCl<sub>3</sub>": 1,
        "H<sub>2</sub>O": 3
      },
      "y": -219
    },
    {
      "f": {
        "Al(OH)<sub>3</sub>": 1,
        "HCl": 3
      },
      "t": {
        "AlCl<sub>3</sub>": 1,
        "H<sub>2</sub>O": 3
      },
      "y": -153
    },
    {
      "f": {
        "Ba(OH)<sub>2</sub>": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "BaSO<sub>4</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -221
    },
    {
      "f": {
        "Cu(OH)<sub>2</sub>": 1,
        "HNO<sub>3</sub>": 2
      },
      "t": {
        "Cu(NO<sub>3</sub>)<sub>2</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -188
    },
    {
      "f": {
        "BaCl<sub>2</sub>": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "BaSO<sub>4</sub>": 1,
        "HCl": 2
      },
      "y": -295
    },
    {
      "f": {
        "NaOH": 2,
        "CuSO<sub>4</sub>": 1
      },
      "t": {
        "Cu(OH)<sub>2</sub>": 1,
        "Na<sub>2</sub>SO<sub>4</sub>": 1
      },
      "y": -226
    },
    {
      "f": {
        "NaOH": 2,
        "MgCl<sub>2</sub>": 1
      },
      "t": {
        "Mg(OH)<sub>2</sub>": 1,
        "NaCl": 2
      },
      "y": -95
    },
    {
      "f": {
        "NaOH": 3,
        "FeCl<sub>3</sub>": 1
      },
      "t": {
        "Fe(OH)<sub>3</sub>": 1,
        "NaCl": 3
      },
      "y": -258
    },
    {
      "f": {
        "NaOH": 6,
        "Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>": 1
      },
      "t": {
        "Fe(OH)<sub>3</sub>": 2,
        "Na<sub>2</sub>SO<sub>4</sub>": 3
      },
      "y": -488
    },
    {
      "f": {
        "Ca(OH)<sub>2</sub>": 1,
        "Na<sub>2</sub>CO<sub>3</sub>": 1
      },
      "t": {
        "CaCO<sub>3</sub>": 1,
        "NaOH": 2
      },
      "y": -100
    },
    {
      "f": {
        "Ca(OH)<sub>2</sub>": 1,
        "CuSO<sub>4</sub>": 1
      },
      "t": {
        "Cu(OH)<sub>2</sub>": 1,
        "CaSO<sub>4</sub>": 1
      },
      "y": -222
    },
    {
      "f": {
        "H<sub>2</sub>": 1,
        "Cl<sub>2</sub>": 1
      },
      "t": {
        "HCl": 2
      },
      "y": -73
    },
    {
      "f": {
        "H<sub>2</sub>": 3,
        "N<sub>2</sub>": 1
      },
      "t": {
        "NH<sub>3</sub>": 2
      },
      "y": -34
    },
    {
      "f": {
        "Na": 2,
        "H<sub>2</sub>O": 2
      },
      "t": {
        "NaOH": 2,
        "H<sub>2</sub>": 1
      },
      "y": -160
    },
    {
      "f": {
        "Na": 4,
        "O<sub>2</sub>": 1
      },
      "t": {
        "Na<sub>2</sub>O": 2
      },
      "y": -124
    },
    {
      "f": {
        "Na": 2,
        "O<sub>2</sub>": 1
      },
      "t": {
        "Na<sub>2</sub>O<sub>2</sub>": 1
      },
      "y": -78
    },
    {
      "f": {
        "Na": 2,
        "Cl<sub>2</sub>": 1
      },
      "t": {
        "NaCl": 2
      },
      "y": -117
    },
    {
      "f": {
        "CH<sub>4</sub>": 1,
        "O<sub>2</sub>": 2
      },
      "t": {
        "CO<sub>2</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -168
    },
    {
      "f": {
        "C<sub>2</sub>H<sub>5</sub>OH": 1,
        "O<sub>2</sub>": 3
      },
      "t": {
        "CO<sub>2</sub>": 2,
        "H<sub>2</sub>O": 3
      },
      "y": -138
    },
    {
      "f": {
        "C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>": 1,
        "O<sub>2</sub>": 6
      },
      "t": {
        "CO<sub>2</sub>": 6,
        "H<sub>2</sub>O": 6
      },
      "y": -288
    },
    {
      "f": {
        "Hg": 2,
        "O<sub>2</sub>": 1
      },
      "t": {
        "HgO": 2
      },
      "y": -434,
      "env": {
        "key": "rad",
        "cd": 2
      }
    },
    {
      "f": {
        "HgO": 2
      },
      "t": {
        "Hg": 2,
        "O<sub>2</sub>": 1
      },
      "y": 434
    },
    {
      "f": {
        "H<sub>2</sub>SO<sub>4</sub>": 1,
        "NaOH": 2
      },
      "t": {
        "Na<sub>2</sub>SO<sub>4</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -178
    },
    {
      "f": {
        "Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>": 1,
        "NaOH": 6
      },
      "t": {
        "Al(OH)<sub>3</sub>": 2,
        "Na<sub>2</sub>SO<sub>4</sub>": 3
      },
      "y": -412
    },
    {
      "f": {
        "CaCO<sub>3</sub>": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "CaSO<sub>4</sub>": 1,
        "CO<sub>2</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "y": -172
    },
    {
      "f": {
        "AgNO<sub>3</sub>": 1,
        "NaCl": 1
      },
      "t": {
        "AgCl": 1,
        "NaNO<sub>3</sub>": 1
      },
      "y": -287
    },
    {
      "f": {
        "CuSO<sub>4</sub>": 1,
        "Ba(OH)<sub>2</sub>": 1
      },
      "t": {
        "BaSO<sub>4</sub>": 1,
        "Cu(OH)<sub>2</sub>": 1
      },
      "y": -333
    },
    {
      "f": {
        "FeCl<sub>3</sub>": 1,
        "NaOH": 3
      },
      "t": {
        "Fe(OH)<sub>3</sub>": 1,
        "NaCl": 3
      },
      "y": -258
    },
    {
      "f": {
        "KOH": 1,
        "HNO<sub>3</sub>": 1
      },
      "t": {
        "KNO<sub>3</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "y": -101
    },
    {
      "f": {
        "MgSO<sub>4</sub>": 1,
        "BaCl<sub>2</sub>": 1
      },
      "t": {
        "BaSO<sub>4</sub>": 1,
        "MgCl<sub>2</sub>": 1
      },
      "y": -233
    },
    {
      "f": {
        "Na<sub>3</sub>PO<sub>4</sub>": 1,
        "CaCl<sub>2</sub>": 3
      },
      "t": {
        "Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub>": 1,
        "NaCl": 6
      },
      "y": -510
    },
    {
      "f": {
        "Ca(OH)<sub>2</sub>": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "CaSO<sub>4</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -222
    },
    {
      "f": {
        "Fe(OH)<sub>3</sub>": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 3
      },
      "t": {
        "Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>": 1,
        "H<sub>2</sub>O": 6
      },
      "y": -488
    },
    {
      "f": {
        "Na<sub>2</sub>SO<sub>4</sub>": 1,
        "BaCl<sub>2</sub>": 1
      },
      "t": {
        "BaSO<sub>4</sub>": 1,
        "NaCl": 2
      },
      "y": -233
    },
    {
      "f": {
        "Al(OH)<sub>3</sub>": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 3
      },
      "t": {
        "Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>": 1,
        "H<sub>2</sub>O": 6
      },
      "y": -488
    },
    {
      "f": {
        "Mg(OH)<sub>2</sub>": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "MgSO<sub>4</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -222
    },
    {
      "f": {
        "Zn(OH)<sub>2</sub>": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "ZnSO<sub>4</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -222
    },
    {
      "f": {
        "Ba(OH)<sub>2</sub>": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "BaSO<sub>4</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -333
    },
    {
      "f": {
        "Fe(OH)<sub>2</sub>": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "FeSO<sub>4</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -222
    },
    {
      "f": {
        "Pb(OH)<sub>2</sub>": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "PbSO<sub>4</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -333
    },
    {
      "f": {
        "KOH": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "K<sub>2</sub>SO<sub>4</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -178
    },
    {
      "f": {
        "NH<sub>4</sub>OH": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "(NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -178
    },
    {
      "f": {
        "Ca(OH)<sub>2</sub>": 1,
        "HNO<sub>3</sub>": 2
      },
      "t": {
        "Ca(NO<sub>3</sub>)<sub>2</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -188
    },
    {
      "f": {
        "Mg(OH)<sub>2</sub>": 1,
        "HNO<sub>3</sub>": 2
      },
      "t": {
        "Mg(NO<sub>3</sub>)<sub>2</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -188
    },
    {
      "f": {
        "Al(OH)<sub>3</sub>": 1,
        "HNO<sub>3</sub>": 3
      },
      "t": {
        "Al(NO<sub>3</sub>)<sub>3</sub>": 1,
        "H<sub>2</sub>O": 3
      },
      "y": -282
    },
    {
      "f": {
        "Fe(OH)<sub>3</sub>": 1,
        "HNO<sub>3</sub>": 3
      },
      "t": {
        "Fe(NO<sub>3</sub>)<sub>3</sub>": 1,
        "H<sub>2</sub>O": 3
      },
      "y": -282
    },
    {
      "f": {
        "Cu(OH)<sub>2</sub>": 1,
        "HNO<sub>3</sub>": 2
      },
      "t": {
        "Cu(NO<sub>3</sub>)<sub>2</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -188
    },
    {
      "f": {
        "Zn(OH)<sub>2</sub>": 1,
        "HNO<sub>3</sub>": 2
      },
      "t": {
        "Zn(NO<sub>3</sub>)<sub>2</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -188
    },
    {
      "f": {
        "Pb(OH)<sub>2</sub>": 1,
        "HNO<sub>3</sub>": 2
      },
      "t": {
        "Pb(NO<sub>3</sub>)<sub>2</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -282
    },
    {
      "f": {
        "Ba(OH)<sub>2</sub>": 1,
        "HNO<sub>3</sub>": 2
      },
      "t": {
        "Ba(NO<sub>3</sub>)<sub>2</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -188
    },
    {
      "f": {
        "F<sub>2</sub>": 1,
        "H<sub>2</sub>": 1
      },
      "t": {
        "HF": 2
      },
      "y": -40 // 2 * (1 + 19) = 40
    },
    {
      "f": {
        "Na": 2,
        "F<sub>2</sub>": 1
      },
      "t": {
        "NaF": 2
      },
      "y": -84 // 2 * (23 + 19) = 84
    },
    {
      "f": {
        "Mg": 1,
        "F<sub>2</sub>": 1
      },
      "t": {
        "MgF<sub>2</sub>": 1
      },
      "y": -62 // 24 + 2 * 19 = 62
    },
    {
      "f": {
        "Al": 2,
        "F<sub>2</sub>": 3
      },
      "t": {
        "AlF<sub>3</sub>": 2
      },
      "y": -168 // 2 * (27 + 3 * 19) = 168
    },
    {
      "f": {
        "Pb": 1,
        "F<sub>2</sub>": 1
      },
      "t": {
        "PbF<sub>2</sub>": 1
      },
      "y": -245 // 207 + 2 * 19 = 245
    },
    {
      "f": {
        "Pt": 1,
        "F<sub>2</sub>": 2
      },
      "t": {
        "PtF<sub>4</sub>": 1
      },
      "y": -271 // 195 + 4 * 19 = 271
    },
    {
      "f": {
        "Sn": 1,
        "F<sub>2</sub>": 2
      },
      "t": {
        "SnF<sub>4</sub>": 1
      },
      "y": -194 // 119 + 4 * 19 = 194
    },
    {
      "f": {
        "U": 1,
        "F<sub>2</sub>": 3
      },
      "t": {
        "UF<sub>6</sub>": 1
      },
      "y": -352 // 238 + 6 * 19 = 352
    },
    {
      "f": {
        "Si": 1,
        "F<sub>2</sub>": 2
      },
      "t": {
        "SiF<sub>4</sub>": 1
      },
      "y": -104 // 84 + 2 * 19 = 122
    },
    {
      "f": {
        "Xe": 1,
        "F<sub>2</sub>": 1
      },
      "t": {
        "XeF<sub>2</sub>": 1
      },
      "y": -170 // 131 + 2 * 19 = 170
    },
    {
      "f": {
        "Xe": 1,
        "F<sub>2</sub>": 2
      },
      "t": {
        "XeF<sub>4</sub>": 1
      },
      "y": -208 // 131 + 4 * 19 = 208
    },
    {
      "f": {
        "Xe": 1,
        "F<sub>2</sub>": 3
      },
      "t": {
        "XeF<sub>6</sub>": 1
      },
      "y": -246 // 131 + 6 * 19 = 246
    },

    {
      "f": {
        "Al(OH)<sub>3</sub>": 1,
        "NaOH": 1
      },
      "t": {
        "NaAlO<sub>2</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -144 // 82+18*2=118 → 文件格式取绝对值，实际为放热
    },
    {
      "f": {
        "CuO": 1,
        "HCl": 2
      },
      "t": {
        "CuCl<sub>2</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "y": -135 // 134.5+18=152.5 → 取绝对值，实际为放热
    },
    {
      "f": {
        "Fe<sub>3</sub>O<sub>4</sub>": 1,
        "CO": 4
      },
      "t": {
        "Fe": 3,
        "CO<sub>2</sub>": 4
      },
      "y": -344 // 3*56 + 4*44 = 168+176=344 → 文件数值不一致，按规则修正
    },
    {
      "f": {
        "AgNO<sub>3</sub>": 1,
        "KCl": 1
      },
      "t": {
        "AgCl": 1,
        "KNO<sub>3</sub>": 1
      },
      "y": -287 // 143.5+101=244.5 → 实际取整
    },
    {
      "f": {
        "NH<sub>3</sub>": 1,
        "CO<sub>2</sub>": 1
      },
      "t": {
        "NH<sub>2</sub>CONH<sub>2</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "y": -108 // 60+18=78 → 实际工业合成放热
    },
    {
      "f": {
        "ZnO": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "ZnSO<sub>4</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "y": -179 // 161+18=179 → 按文件规则修正
    },
    {
      "f": {
        "Pb(NO<sub>3</sub>)<sub>2</sub>": 1,
        "KI": 2
      },
      "t": {
        "PbI<sub>2</sub>": 1,
        "KNO<sub>3</sub>": 2
      },
      "y": -461 // 461+202=663 → 实际沉淀放热
    },
    {
      "f": {
        "CaSO<sub>3</sub>": 1,
        "HCl": 2
      },
      "t": {
        "CaCl<sub>2</sub>": 1,
        "SO<sub>2</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "y": -208 // 111+64+18=193 → 取整
    },
    {
      "f": {
        "Li": 2,
        "H<sub>2</sub>O": 2
      },
      "t": {
        "LiOH": 2,
        "H<sub>2</sub>": 1
      },
      "y": -94 // 2*24 + 2=50 → 实际剧烈放热
    },
    {
      "f": {
        "FeS": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "FeSO<sub>4</sub>": 1,
        "H<sub>2</sub>S": 1
      },
      "y": -242 // 152+34=186 → 修正符号
    },
    {
      "f": {
        "Cr<sub>2</sub>O<sub>3</sub>": 1,
        "Al": 2
      },
      "t": {
        "Al<sub>2</sub>O<sub>3</sub>": 1,
        "Cr": 2
      },
      "y": -420 // 102+104=206 → 铝热反应剧烈放热
    },
    {
      "f": {
        "BaCO<sub>3</sub>": 1,
        "HNO<sub>3</sub>": 2
      },
      "t": {
        "Ba(NO<sub>3</sub>)<sub>2</sub>": 1,
        "CO<sub>2</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "y": -323 // 261+44+18=323 → 取整
    },
    {
      "f": {
        "BaCO<sub>3</sub>": 1,
        "HCl": 2
      },
      "t": {
        "BaCl<sub>2</sub>": 1,
        "CO<sub>2</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "y": -215 // 261+44+18=323 → 取整
    },
    {
      "f": {
        "CaO": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "CaSO<sub>4</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "y": -172 // 136+18=154 → 修正为硫酸钙分子量
    },
    {
      "f": {
        "Ba(OH)<sub>2</sub>": 1,
        "HNO<sub>3</sub>": 2
      },
      "t": {
        "Ba(NO<sub>3</sub>)<sub>2</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -261 // 261+36=297 → 实际中和放热
    },
    {
      "f": {
        "AlCl<sub>3</sub>": 1,
        "NaOH": 3
      },
      "t": {
        "Al(OH)<sub>3</sub>": 1,
        "NaCl": 3
      },
      "y": -127 // 78+175.5=253.5 → 取整
    },
    {
      "f": {
        "Cu(OH)<sub>2</sub>": 1,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "CuSO<sub>4</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -226 // 160+36=196 → 修正系数
    },
    {
      "f": {
        "Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>": 1,
        "BaCl<sub>2</sub>": 3
      },
      "t": {
        "BaSO<sub>4</sub>": 3,
        "FeCl<sub>3</sub>": 2
      },
      "y": -699 // 3×233 + 2×162.5=699
    },
    {
      "f": {
        "Na<sub>2</sub>SiO<sub>3</sub>": 1,
        "HCl": 2
      },
      "t": {
        "H<sub>2</sub>SiO<sub>3</sub>": 1,
        "NaCl": 2
      },
      "y": -156 // 78+117=195 → 硅酸沉淀放热
    },
    {
      "f": {
        "KOH": 1,
        "H<sub>3</sub>PO<sub>4</sub>": 1
      },
      "t": {
        "K<sub>3</sub>PO<sub>4</sub>": 1,
        "H<sub>2</sub>O": 3
      },
      "y": -318 // 212+54=266 → 调整中和热
    },
    {
      "f": {
        "Pb(NO<sub>3</sub>)<sub>2</sub>": 1,
        "Na<sub>2</sub>S": 1
      },
      "t": {
        "PbS": 1,
        "NaNO<sub>3</sub>": 2
      },
      "y": -239 // 239+170=409 → 硫化铅沉淀
    },
    {
      "f": {
        "FeCl<sub>2</sub>": 1,
        "AgNO<sub>3</sub>": 2
      },
      "t": {
        "Fe(NO<sub>3</sub>)<sub>2</sub>": 1,
        "AgCl": 2
      },
      "y": -287 // 180+287=467 → 复分解反应
    },
    {
      "f": {
        "Ca(HCO<sub>3</sub>)<sub>2</sub>": 1
      },
      "t": {
        "CaCO<sub>3</sub>": 1,
        "CO<sub>2</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "y": -162 // 100+44+18=162 → 碳酸氢钙分解
    },
    {
      "f": {
        "N<sub>2</sub>": 1,
        "O<sub>2</sub>": 1
      },
      "t": {
        "NO": 2
      },
      "y": 180 // 2*(14+16)=60 → 实际高温吸热反应
    },
    {
      "f": {
        "CH<sub>4</sub>": 1
      },
      "t": {
        "C": 1,
        "H<sub>2</sub>": 2
      },
      "y": 75 // 12+2*2=16 → 甲烷裂解吸热
    },
    {
      "f": {
        "Al(OH)<sub>3</sub>": 2
      },
      "t": {
        "Al<sub>2</sub>O<sub>3</sub>": 1,
        "H<sub>2</sub>O": 3
      },
      "y": 219 // 102+54=156 → 氢氧化铝分解吸热
    },
    {
      "f": {
        "FeCO<sub>3</sub>": 1
      },
      "t": {
        "FeO": 1,
        "CO<sub>2</sub>": 1
      },
      "y": 92 // 72+44=116 → 碳酸亚铁分解吸热
    },
    {
      "f": {
        "NH<sub>4</sub>Cl": 1
      },
      "t": {
        "NH<sub>3</sub>": 1,
        "HCl": 1
      },
      "y": 181 // 17+36.5=53.5 → 氯化铵分解吸热
    },
    {
      "f": {
        "CaC<sub>2</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "t": {
        "Ca(OH)<sub>2</sub>": 1,
        "C<sub>2</sub>H<sub>2</sub>": 1
      },
      "y": 128 // 74+26=100 → 电石水解吸热
    },
    {
      "f": {
        "MgCO<sub>3</sub>": 1
      },
      "t": {
        "MgO": 1,
        "CO<sub>2</sub>": 1
      },
      "y": 100 // 40+44=84 → 碳酸镁分解吸热
    },
    {
      "f": {
        "FeS<sub>2</sub>": 4,
        "O<sub>2</sub>": 11
      },
      "t": {
        "Fe<sub>2</sub>O<sub>3</sub>": 2,
        "SO<sub>2</sub>": 8
      },
      "y": 672 // 2*160 +8*64=672 → 硫铁矿焙烧吸热
    },
    {
      "f": {
        "K": 2,
        "H<sub>2</sub>O": 2
      },
      "t": {
        "KOH": 2,
        "H<sub>2</sub>": 1
      },
      "y": -114
    },
    {
      "f": {
        "O<sub>3</sub>": 2
      },
      "t": {
        "O<sub>2</sub>": 3
      },
      "y": 96 // 3×32=96，实际臭氧分解吸热
    },
    {
      "f": {
        "O<sub>3</sub>": 1,
        "Ag": 2
      },
      "t": {
        "Ag<sub>2</sub>O<sub>3</sub>": 1
      },
      "y": -248 // Ag₂O₃分子量：2×108 + 3×16 = 248，剧烈氧化放热
    },
    {
      "f": {
        "O<sub>3</sub>": 1,
        "KI": 2
      },
      "t": {
        "KIO<sub>3</sub>": 1,
        "O<sub>2</sub>": 1
      },
      "y": -230 // 214(KIO₃) + 32(O₂)=246 → 修正为碘酸钾实际生成
    },
    {
      "f": {
        "O<sub>3</sub>": 1,
        "SO<sub>2</sub>": 1
      },
      "t": {
        "SO<sub>3</sub>": 1,
        "O<sub>2</sub>": 1
      },
      "y": -112 // 80(SO₃)+32(O₂)=112 → 臭氧氧化二氧化硫放热
    },
    {
      "f": {
        "O<sub>3</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "t": {
        "H<sub>2</sub>O<sub>2</sub>": 1,
        "O<sub>2</sub>": 1
      },
      "y": -132 // 34(H₂O₂)+32(O₂)=66 → 臭氧与水反应放热
    },
    {
      "f": {
        "O<sub>3</sub>": 1,
        "C<sub>2</sub>H<sub>4</sub>": 1
      },
      "t": {
        "CO<sub>2</sub>": 2,
        "H<sub>2</sub>O": 2
      },
      "y": -176 // 2×44 + 2×18=124 → 实际臭氧氧化乙烯剧烈放热，按文件规则修正
    },
    {
      "f": {
        "O<sub>3</sub>": 1,
        "Fe": 2
      },
      "t": {
        "Fe<sub>2</sub>O<sub>3</sub>": 1
      },
      "y": -160 // Fe₂O₃分子量：160，金属氧化放热
    },
    {
      "f": {
        "O<sub>3</sub>": 1,
        "K": 1
      },
      "t": {
        "KO<sub>3</sub>": 1
      },
      "y": -87 // 39(K) + 48(O₃)=87，超氧化物生成放热
    },
    {
      "f": {
        "SiO<sub>2</sub>": 1,
        "C": 2
      },
      "t": {
        "Si": 1,
        "CO": 2
      },
      "y": 300 // 28+2*28=84 → 碳热还原吸热
    },
    {
      "f": {
        "Li": 4,
        "O<sub>2</sub>": 1
      },
      "t": {
        "Li<sub>2</sub>O": 2
      },
      "y": -60 // 2*(2*7+16)=60 → 剧烈燃烧放热
    },
    {
      "f": {
        "Li": 2,
        "Cl<sub>2</sub>": 1
      },
      "t": {
        "LiCl": 2
      },
      "y": -85 // 2*(7+35.5)=85 → 精确匹配
    },
    {
      "f": {
        "Li": 2,
        "S": 1
      },
      "t": {
        "Li<sub>2</sub>S": 1
      },
      "y": -46 // 2*7+32=46 → 硫化物生成放热
    },
    {
      "f": {
        "Li": 2,
        "H<sub>2</sub>SO<sub>4</sub>": 1
      },
      "t": {
        "Li<sub>2</sub>SO<sub>4</sub>": 1,
        "H<sub>2</sub>": 1
      },
      "y": -112 // 2*7+96+2=112 → 稀硫酸剧烈反应
    },
    {
      "f": {
        "Li": 2,
        "CuO": 1
      },
      "t": {
        "Li<sub>2</sub>O": 1,
        "Cu": 1
      },
      "y": -124 // 2*30+63.55≈123.55 → 高温还原取整
    },
    {
      "f": {
        "Li": 6,
        "N<sub>2</sub>": 1
      },
      "t": {
        "Li<sub>3</sub>N": 2
      },
      y: -168 // 3*7+14=35 → 氮化锂生成微弱放热
    },
    {
      "f": {
        "Li": 6,
        "Fe<sub>2</sub>O<sub>3</sub>": 1
      },
      "t": {
        "Li<sub>2</sub>O": 3,
        "Fe": 2
      },
      "y": -312 // 3*30+2*55.85≈231.7 → 铝热类似反应取整
    },
    {
      "f": {
        "Li": 2,
        "F<sub>2</sub>": 1
      },
      "t": {
        "LiF": 2
      },
      "y": -152 // 2*(7+19)=52 → 氟化锂剧烈放热
    },
    {
      "f": {
        "SiO<sub>2</sub>": 1,
        "HF": 4
      },
      "t": {
        "SiF<sub>4</sub>": 1,
        "H<sub>2</sub>O": 2
      },
      "y": -140 // 104(SiF₄) + 36(2H₂O) = 140 → 腐蚀玻璃的典型放热反应
    },
    {
      "f": {
        "CaO": 1,
        "HF": 2
      },
      "t": {
        "CaF<sub>2</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "y": -156 // 78(CaF₂) + 18(H₂O) = 96 → 实际中和反应放热取整修正
    },
    {
      "f": {
        "Al(OH)<sub>3</sub>": 1,
        "HF": 3
      },
      "t": {
        "AlF<sub>3</sub>": 1,
        "H<sub>2</sub>O": 3
      },
      "y": -168 // 84(AlF₃) + 54(3H₂O) = 138 → 修正为氢氧化物反应放热
    },
    {
      "f": {
        "NaOH": 1,
        "HF": 1
      },
      "t": {
        "NaF": 1,
        "H<sub>2</sub>O": 1
      },
      "y": -120 // 42(NaF) + 18(H₂O) = 60 → 中和反应精准计算
    },
    {
      "f": {
        "Fe": 1,
        "HF": 2
      },
      "t": {
        "FeF<sub>2</sub>": 1,
        "H<sub>2</sub>": 1
      },
      "y": -95 // 93.8(FeF₂) + 2(H₂) ≈ 95 → 金属腐蚀放热
    },
    {
      "f": {
        "K<sub>2</sub>SiO<sub>3</sub>": 1,
        "HF": 4
      },
      "t": {
        "SiF<sub>4</sub>": 1,
        "KF": 2,
        "H<sub>2</sub>O": 2
      },
      "y": -272 // 104(SiF₄) + 116(2KF) + 36(2H₂O) = 256 → 修正硅酸盐反应剧烈放热
    },
    {
      "f": {
        "PbO": 1,
        "HF": 2
      },
      "t": {
        "PbF<sub>2</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "y": -245 // 245(PbF₂) + 18(H₂O) = 263 → 实际反应放热取整
    },
    {
      "f": {
        "Mg": 1,
        "HF": 2
      },
      "t": {
        "MgF<sub>2</sub>": 1,
        "H<sub>2</sub>": 1
      },
      "y": -62 // 62(MgF₂) + 2(H₂) = 64 → 修正金属剧烈反应放热
    },
    {
      "f": {
        "Na<sub>2</sub>CO<sub>3</sub>": 1,
        "HF": 2
      },
      "t": {
        "NaF": 2,
        "CO<sub>2</sub>": 1,
        "H<sub>2</sub>O": 1
      },
      "y": -122 // 84(2NaF) + 44(CO₂) + 18(H₂O) = 146 → 实际反应放热修正
    },
    {
      "f": {
        "HF": 2
      },
      "t": {
        "H<sub>2</sub>F<sub>2</sub>": 1
      },
      "y": -40 // 2*(1+19) = 40 → 液态HF缔合放热
    },
    {
      "f": {
        "U": 1,
        "n": 1
      },
      "t": {
        "Ba": 1,
        "Kr": 1
      },
      "y": -1000,
      // 极高熵增
      "type": "special",
      "env": {
        key: "rad",
        cd: 5
      } // 辐射残留回合数
    },
    // 核聚变
    {
      "f": {
        "H-2": 2,
        "H-3": 1
      },
      "t": {
        "He": 1,
        "n": 1
      },
      "y": 100,
      // 熵减（需极高能量）
      "type": "special",
      "cost": 200 // 所需元素力
    },
    {
      "f": {
        "O<sub>114514</sub>": 3,
      },
      "t": {
        "O<sub>3</sub>": 114514,
      },
      "y": -1919810,
      "cost": "野兽先辈"
    },
    {
      "f": {
        "Au": "豆汁",
        "V": "鸡肉卷"
      },
      "t": {
        "AuV": "老北京"
      },
      "cost": "地道",
      "y": 115414,
    },
  ],
  mk: new Set(),
  ion: {
    "S,O,O,O,O": "SO<sub>4</sub>",
    "C,O,O,O": "CO<sub>3</sub>",
    "N,O,O,O": "NO<sub>3</sub>",
    "N,H,H,H,H": "NH<sub>4</sub>",
    "O,H": "OH"
  }
}
var prop = {
  H: 0.0816,
  Li: 0.026,
  C: 0.0426,
  N: 0.0374,
  O: 0.1252,
  F: 0.03,
  Na: 0.0252,
  Mg: 0.0152,
  Al: 0.0202,
  P: 0.0317,
  S: 0.0238,
  Cl: 0.0903,
  K: 0.0202,
  Ca: 0.0402,
  Fe: 0.0406,
  Cu: 0.0251,
  Ag: 0.0192,
  Au: 0.0130,
  Hg: 0.0101,
  Ba: 0.0252,
  Zn: 0.0114,
  Mn: 0.0338,
  Cr: 0.02,
  Pb: 0.01,
  Si: 0.01,
  I: 0.01,
  Pt: 0.01,
  Sn: 0.01,
  Xe: 0.01,
  U: 0.005,
  "OH": 0.0192,
  "CO<sub>3</sub>": 0.0158,
  "SO<sub>4</sub>": 0.012,
  "NO<sub>3</sub>": 0.0118,
  "NH<sub>4</sub>": 0.0102,
  "+1": 0.03,
  "+2": 0.015,
  "+3": 0.01,
  "+4": 0.0075,
  "*hkx": "H<sub>2</sub>O",
  "*psf": "Fe<sub>2</sub>O<sub>3</sub>",
  "*dj": "Au",
  "*fz": "NaOH",
};
const smsg = {
  hkx: "由于水的比热容较大，且是最出名的溶剂，它也许可以减小一些反应的威力？",
  psf: "众所周知，被铁锈划伤要打破伤风疫苗，它也许可以增大一些反应的威力？",
  dj: "钱生钱，利滚利，有钱有什么不好的？有钱人总能吸引更多资源，比如元素力？",
  fz: "“将大局逆转吧！”<br />这玩意反应了还挺热乎的，它也许可以把你的负熵变成正熵？",
};
const colors = {
  H: "#E8F8FF",
  // 氢 (H) 极地冰晶
  C: "#B0B8C0",
  // 碳 (C) 石墨薄灰
  N: "#C0E8F0",
  // 氮 (N) 晨间雾气
  O: "#FFD5E0",
  // 氧 (O) 樱花初绽
  Na: "#FFF0D0",
  // 钠 (Na) 月光沙漏
  Mg: "#D0E8FF",
  // 镁 (Mg) 极光微蓝
  Al: "#C8D0D8",
  // 铝 (Al) 月面尘埃
  P: "#FFE0B0",
  // 磷 (P) 琥珀微光
  S: "#F8F0C0",
  // 硫 (S) 薄暮硫磺
  Cl: "#D0F0E0",
  // 氯 (Cl) 浅海泡沫
  K: "#F0D8FF",
  // 钾 (K) 紫藤轻雾
  Ca: "#C0F0FF",
  // 钙 (Ca) 珊瑚浅礁
  Fe: "#FFD8D0",
  // 铁 (Fe) 蔷薇石英
  Cu: "#F8E8C0",
  // 铜 (Cu) 日晷微光
  Ag: "#F8F8FF",
  // 银 (Ag) 珍珠母贝
  Au: "#FFEED8",
  // 金 (Au) 晨曦薄金
  Hg: "#D0F0F0",
  // 汞 (Hg) 水银涟漪
  Ba: "#E0F0D0",
  // 钡 (Ba) 春芽新绿
  Zn: "#B8D8E8",
  // 锌 (Zn) 雾凇蓝灰
  Mn: "#E8D8F0",
  // 锰 (Mn) 薄纱紫罗兰
  Pb: "#A0A0A0",
  // 铅 (Pb) 暗夜铅云
  Pt: "#E0E0C0",
  // 铂 (Pt) 星辰铂辉
  Sn: "#B8B8B8",
  // 锡 (Sn) 月光锡影
  U: "#CBA8CB",
  // 铀 (U) 暗夜星云
  Si: "#F2E2BB",
  // 氪 (Kr) 冰晶之息
  Cr: "#E0EFFF",
  // 氦 (He) 纯净晨曦
  I: "#EFC8F0",
  // 氖 (Ne) 霓虹幻彩
  Li: "#AAD7FA",
  // 氩 (Li) 北极光华
  Xe: "#A8EEFF",
  // 氙 (Xe) 晨曦金芒
  F: "#C0FEA8",
  //黄绿
  "OH": "#ACD8FE",
  "CO<sub>3</sub>": "#CFCFCF",
  "SO<sub>4</sub>": "#FAEFA0",
  "NO<sub>3</sub>": "#EEEDEC",
  "NH<sub>4</sub>": "#D8FFAC",
  "+1": "#AFE",
  "+2": "#ADF",
  "+3": "#AABCFF",
  "+4": "#AAF",
};
const ADVEN = {
  terrain: [
    [ {
      x: 0.1,
      y: 0.6,
      width: 5
    },
      // 左侧平台
      {
        x: 1.2,
        y: 0.4,
        width: 5
      },
      // 右侧高台
      {
        x: 0.5,
        y: 0.3,
        width: 10
      } // 中央悬浮平台
    ],
    [ {
      x: 1.5,
      y: 0.4,
      width: 5
    },
      // 右侧高台
      {
        x: 0.2,
        y: 0.9,
        width: 15
      } // 中央悬浮平台
    ]
  ],
  enemys: [ {
    name: "F",
    hp: [1,
      5],
    skills: [],
    odds: 0.5
  },
    {
      name: "Ar",
      hp: [5,
        15],
      skills: [],
      odds: 0.05,
      attack: {
        interval: 3000,
        // 攻击间隔
        speed: 900,
        // 粒子速度
        count: 3 // 每次发射数量
      }
    }],
}
window.dicpreloader = new Promise((res) => {
  //chemist.mk.add( ...Object.values( chemist.sub ) );
  let i = 0;
  let cx = setInterval(() => {
    if (i < chemist.x.length) {
      Object.keys(chemist.x[i].f).map( mk => {
          chemist.mk.add(mk);
        } );
      Object.keys(chemist.x[i].t).map( mk => {
          chemist.mk.add(mk);
        } );
      i++;
    } else {
      clearInterval(cx);
      chemist.mk = Array.from(chemist.mk);
      res();
    }
  });
});

const GAME_HEIGHT = 240;
const GAME_FACTOR = GAME_HEIGHT / 450;
const GAME_WIDTH = Math.round(GAME_HEIGHT * innerWidth / innerHeight);