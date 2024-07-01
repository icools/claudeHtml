const jsonData1 = {
    "nodes": [
      {"id": "Station1", "group": 1},
      {"id": "Station2", "group": 1},
      {"id": "Station3", "group": 1},
      {"id": "Station4", "group": 1},
      {"id": "Station5", "group": 1},
      {"id": "Station6", "group": 1},
      {"id": "Station7", "group": 1},
      {"id": "UserA", "group": 2},
      {"id": "UserB", "group": 2},
      {"id": "UserC", "group": 2},
      {"id": "UserD", "group": 2},
      {"id": "UserE", "group": 2}
    ],
    "links": [
      {"source": "UserA", "target": "Station1", "value": 2},
      {"source": "UserA", "target": "Station2", "value": 3},
      {"source": "UserB", "target": "Station3", "value": 1},
      {"source": "UserB", "target": "Station4", "value": 1},
      {"source": "UserC", "target": "Station1", "value": 4},
      {"source": "UserC", "target": "Station5", "value": 2},
      {"source": "UserD", "target": "Station2", "value": 5},
      {"source": "UserD", "target": "Station6", "value": 1},
      {"source": "UserE", "target": "Station3", "value": 2},
      {"source": "UserE", "target": "Station7", "value": 3},
      {"source": "Station1", "target": "Station2", "value": 1},
      {"source": "Station3", "target": "Station4", "value": 1},
      {"source": "Station5", "target": "Station6", "value": 1},
      {"source": "Station6", "target": "Station7", "value": 1}
    ]
  }
  

const jsonData2 = {
    "nodes": [
      {"id": "作者", "group": 0},
      {"id": "導航王TM版", "group": 1},
      {"id": "高、快速道路匝道口顯示", "group": 2},
      {"id": "測速照相提醒", "group": 2},
      {"id": "山區導航準確", "group": 2},
      {"id": "圖資更新慢", "group": 3},
      {"id": "介面精簡", "group": 3},
      {"id": "路徑規劃差", "group": 3},
      {"id": "播報聲音不好聽", "group": 3},
      {"id": "Carplay介面醜", "group": 3},
      {"id": "試用後退訂", "group": 3},
      {"id": "免費導航", "group": 4},
      {"id": "Seattle995", "group": 1},
      {"id": "can05025", "group": 1},
      {"id": "krit1009", "group": 3},
      {"id": "其他用戶反饋", "group": 1}
    ],
    "links": [
      {"source": "作者", "target": "導航王TM版", "value": 2},
      {"source": "導航王TM版", "target": "高、快速道路匝道口顯示", "value": 1},
      {"source": "導航王TM版", "target": "測速照相提醒", "value": 1},
      {"source": "導航王TM版", "target": "山區導航準確", "value": 1},
      {"source": "導航王TM版", "target": "圖資更新慢", "value": -1},
      {"source": "導航王TM版", "target": "介面精簡", "value": -1},
      {"source": "導航王TM版", "target": "路徑規劃差", "value": -1},
      {"source": "導航王TM版", "target": "播報聲音不好聽", "value": -1},
      {"source": "導航王TM版", "target": "Carplay介面醜", "value": -1},
      {"source": "導航王TM版", "target": "試用後退訂", "value": -1},
      {"source": "作者", "target": "高、快速道路匝道口顯示", "value": 1},
      {"source": "作者", "target": "測速照相提醒", "value": 1},
      {"source": "作者", "target": "山區導航準確", "value": 1},
      {"source": "作者", "target": "圖資更新慢", "value": -1},
      {"source": "作者", "target": "介面精簡", "value": -1},
      {"source": "作者", "target": "路徑規劃差", "value": -1},
      {"source": "作者", "target": "播報聲音不好聽", "value": -1},
      {"source": "作者", "target": "Carplay介面醜", "value": -1},
      {"source": "作者", "target": "試用後退訂", "value": -1},
      {"source": "免費導航", "target": "導航王TM版", "value": -1},
      {"source": "Seattle995", "target": "導航王TM版", "value": 1},
      {"source": "can05025", "target": "導航王TM版", "value": 1},
      {"source": "krit1009", "target": "導航王TM版", "value": -1},
      {"source": "krit1009", "target": "免費導航", "value": -1},
      {"source": "其他用戶反饋", "target": "導航王TM版", "value": 1}
    ]
  }