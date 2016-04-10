export const GameModel = {
	defaultTextDelay: "6000",
	fastModeTextDelay: "3000",
	currentGameState:{area:0,step:0},
	waitingForAction: false,
	completedFlows:{
	
	},
	gameFlows:{
		"area_0":{
			"scene_0":{
				possibleAction:0,
				0:{
				
					text: ["TEXT_VALUE_0_0_1","TEXT_VALUE_0_0_2","TEXT_VALUE_0_0_3"],
					location: "LOCATION_0",
					completed:false,
					actions:[
						        //  		area,scene,step // area, step,butId
							{text:"ACTION_VALUE_0_0_1", value: [0,0,1], delay:"6000", chosen:false}//осмотреть комнату
						
					]
				},
				1:{
					text: ["TEXT_VALUE_0_1_1","TEXT_VALUE_0_1_2"],
					location: "LOCATION_0",
					completed:false,
					actions:[
						{text:"ACTION_VALUE_0_1_1", value:[0,1,0], moveToScene:1, delay:"6000", chosen:false},//подойти к двери
						{text:"ACTION_VALUE_0_1_2", value:[0,2,0], moveToScene:2, delay:"6000", chosen:false}// подойти к окну
					]	
				}
			},
			"scene_1":{
				possibleAction:0,
				0:{
					completed:false,
					actions:[
						{text:"ACTION_VALUE_0_1_1", value:[0,1,1], delay:"6000", chosen:false}//подойти к двери
						// {text:"ACTION_VALUE_0_1_2", value:[0,2,0], delay:"6000"}// подойти к окну
					]
				},
				1:{
					text: ["TEXT_VALUE_0_2_1","TEXT_VALUE_0_2_2","TEXT_VALUE_0_2_3","TEXT_VALUE_0_2_4"],
					location: "LOCATION_0",
					completed:false,
					actions:[
						{text:"ACTION_VALUE_0_2_1", value: [0,1,2], delay:"6000", chosen:false},//попробовать выломать дверь
						{text:"ACTION_VALUE_0_2_2", value: [0,0,1], delay:"6000", chosen:false}//осмотреть снова комнату
					]
				},

				2:{
					text: ["TEXT_VALUE_0_3_1","TEXT_VALUE_0_3_2", "TEXT_VALUE_0_3_3", "TEXT_VALUE_0_3_4"],
					location: "LOCATION_0",
					completed:false,
					actions:[
						{text:"ACTION_VALUE_0_3_1", value: [1,0,0], delay:"6000", chosen:false},//попробовать выламывать дверь дальше -> MOVE TO NEXT AREA
						{text:"ACTION_VALUE_0_2_2", value: [0,0,1], delay:"6000", chosen:false}//осмотреть снова комнату пока не привлек много внимания
					]
				}
			},
			"scene_2":{
				possibleAction:0,
				0:{
					completed:false,
					actions:[
						// {text:"ACTION_VALUE_0_1_1", value:[0,1,1], delay:"6000"},//подойти к двери
						{text:"ACTION_VALUE_0_1_2", value:[0,2,1], delay:"6000",chosen:false}// подойти к окну
					]
				},
				1:{
					text: ["TEXT_VALUE_0_4_1","TEXT_VALUE_0_4_2", "TEXT_VALUE_0_4_3", "TEXT_VALUE_0_4_4"],
					location: "LOCATION_0",
					completed:false,
					actions:[
						{text:"ACTION_VALUE_0_4_1", value: [0,2,2], delay:"6000",chosen:false},//Открыть окно 
						{text:"ACTION_VALUE_0_2_2", value: [0,0,1], delay:"6000",chosen:false}//осмотреть комнату заново
						
					]	
				},
				2:{
					text: ["TEXT_VALUE_0_5_1", "TEXT_VALUE_0_5_2", "TEXT_VALUE_0_5_3","TEXT_VALUE_0_5_4","TEXT_VALUE_0_5_5"],
					location: "LOCATION_0",
					completed:false,
					actions:[
						
						{text:"ACTION_VALUE_0_5_1", value: [2,0,0], delay:"6000",chosen:false},//вылезти из окна -> MOVE TO NEXT AREA
						{text:"ACTION_VALUE_0_2_2", value: [0,0,1], delay:"6000", chosen:false}//осмотреть комнату заново
					]		
				}
			}
		}
	}
}




