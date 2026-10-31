// Arrow Zen. Derived from robmat/arrows_game (GPL-3.0). The generator lives in generator.js (also used by worker.js).
(()=>{'use strict';
const $=id=>document.getElementById(id);
const MAXCS=96,HINTS=3,UNDOS=3,TA_START=90,TA_BONUS=8,TA_PEN=5;
const THEMES={
 Night:{dot:'#383D53',bg:'#1E202D',snake:'#ABB6F4',acc:'#5B72FF',btn:'#40466A',btnfg:'#AFB6E2',fg:'#D7DCF0',card:'#282D40',track:'#282D40',prog:'#5B72FF',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#fff',title:'#D7DCF0',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Day:{dot:'#D9DCED',bg:'#FFFFFF',snake:'#111433',acc:'#5B72FF',btn:'#CCD3F3',btnfg:'#2F3768',fg:'#313A73',card:'#EEF0F9',track:'#EEF0F9',prog:'#5B72FF',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#fff',title:'#313A73',inv:'none',good:'#12864A',goodfg:'#FFFFFF',gold:'#B07400',flame:'#E0670A'},
 Dark:{dot:'#25504D',bg:'#13302F',snake:'#E8D9B5',acc:'#3FA9A0',btn:'#2D5957',btnfg:'#C6E3DF',fg:'#F2F6F4',card:'#1D4140',track:'#1D4140',prog:'#3FA9A0',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#F2F6F4',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Midnight:{dot:'#182039',bg:'#05070F',snake:'#9FB4FF',acc:'#4663F5',btn:'#212D4D',btnfg:'#B4C2F5',fg:'#E6ECFF',card:'#121A2D',track:'#121A2D',prog:'#4663F5',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#fff',title:'#E6ECFF',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 'Black and White':{dot:'#2B2B2B',bg:'#000000',snake:'#E6E6E6',acc:'#FFFFFF',btn:'#303030',btnfg:'#DADADA',fg:'#FFFFFF',card:'#171717',track:'#171717',prog:'#FFFFFF',heart:'#FF5A5A',bad:'#FF2A2A',pfg:'#000000',title:'#FFFFFF',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Graphite:{dot:'#2C2E35',bg:'#16171B',snake:'#EDEBE6',acc:'#F5B942',btn:'#363A44',btnfg:'#D3D1CB',fg:'#F1F0EC',card:'#22242A',track:'#22242A',prog:'#F5B942',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#F1F0EC',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Ocean:{dot:'#173A59',bg:'#0B1B2B',snake:'#9BDCFF',acc:'#2F9BFF',btn:'#1D4A6E',btnfg:'#A9D4F2',fg:'#E3F3FF',card:'#12304A',track:'#12304A',prog:'#2F9BFF',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#E3F3FF',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Nord:{dot:'#434C5E',bg:'#2E3440',snake:'#88C0D0',acc:'#88C0D0',btn:'#4C566A',btnfg:'#D8DEE9',fg:'#ECEFF4',card:'#3B4252',track:'#3B4252',prog:'#88C0D0',heart:'#BF616A',bad:'#FF2A2A',pfg:'#2E3440',title:'#ECEFF4',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Purple:{dot:'#33254D',bg:'#1A1226',snake:'#D2B8FF',acc:'#9B6BFF',btn:'#3B2A58',btnfg:'#CDB9F2',fg:'#F0E8FF',card:'#271B3B',track:'#271B3B',prog:'#9B6BFF',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#F0E8FF',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Dracula:{dot:'#3D4054',bg:'#282A36',snake:'#CBA8FF',acc:'#FF79C6',btn:'#4A4E66',btnfg:'#D6D8EC',fg:'#F8F8F2',card:'#343746',track:'#343746',prog:'#FF79C6',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#282A36',title:'#F8F8F2',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Rose:{dot:'#4A2236',bg:'#26121C',snake:'#FFB3D1',acc:'#F0508F',btn:'#57283F',btnfg:'#F6BFD6',fg:'#FFE6F0',card:'#391A2A',track:'#391A2A',prog:'#F0508F',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#FFE6F0',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Sunset:{dot:'#4A3050',bg:'#2A1B2E',snake:'#FFB38A',acc:'#FF5E7E',btn:'#54335C',btnfg:'#F5C9D6',fg:'#FFE9E0',card:'#3A2541',track:'#3A2541',prog:'#FF5E7E',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#FFE9E0',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Red:{dot:'#4A2C2C',bg:'#2E1B1B',snake:'#FFB8B3',acc:'#FF4F8B',btn:'#5F3636',btnfg:'#F2C3C0',fg:'#FFECEA',card:'#432727',track:'#432727',prog:'#FF4F8B',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#FFECEA',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Orange:{dot:'#4A3A2C',bg:'#2E241B',snake:'#FFCC80',acc:'#FF9800',btn:'#5D4838',btnfg:'#EBCFA8',fg:'#FFF1E0',card:'#42332A',track:'#42332A',prog:'#FF9800',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#FFF1E0',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Yellow:{dot:'#4A4A2C',bg:'#2E2E1B',snake:'#FFF176',acc:'#FFEB3B',btn:'#5C5C38',btnfg:'#E8E49A',fg:'#FFFDE0',card:'#42422A',track:'#42422A',prog:'#FFEB3B',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#FFFDE0',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Green:{dot:'#2C4A2C',bg:'#1B2E1B',snake:'#A8E6CF',acc:'#4CAF50',btn:'#385C38',btnfg:'#BDE3BD',fg:'#EAFBEA',card:'#274227',track:'#274227',prog:'#4CAF50',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#EAFBEA',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Mocha:{dot:'#3B2A20',bg:'#1F1612',snake:'#EBCBA0',acc:'#D08A4E',btn:'#4A3326',btnfg:'#E0C4A5',fg:'#F6E9DA',card:'#312119',track:'#312119',prog:'#D08A4E',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#F6E9DA',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Cyber:{dot:'#20203F',bg:'#0A0A14',snake:'#00F5D4',acc:'#F72585',btn:'#2B2B5A',btnfg:'#A9F0FF',fg:'#E8F8FF',card:'#17172F',track:'#17172F',prog:'#F72585',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#0B0F1A',title:'#E8F8FF',inv:'invert(1)',good:'#2BD17E',goodfg:'#04210F',gold:'#FFC53D',flame:'#FF9F43'},
 Paper:{dot:'#E6DAC0',bg:'#FBF6EC',snake:'#3B2F1E',acc:'#B5561D',btn:'#DBCBA6',btnfg:'#51402A',fg:'#3B2F1E',card:'#F0E6D0',track:'#F0E6D0',prog:'#B5561D',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#FFFFFF',title:'#3B2F1E',inv:'none',good:'#12864A',goodfg:'#FFFFFF',gold:'#B07400',flame:'#E0670A'},
 Mint:{dot:'#CFE6D9',bg:'#F2FBF6',snake:'#103D2A',acc:'#16875A',btn:'#AEDABE',btnfg:'#1D4A36',fg:'#123324',card:'#D9EFE2',track:'#D9EFE2',prog:'#16875A',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#FFFFFF',title:'#123324',inv:'none',good:'#12864A',goodfg:'#FFFFFF',gold:'#B07400',flame:'#E0670A'},
 Sky:{dot:'#CFE2F0',bg:'#F2F9FE',snake:'#0B3556',acc:'#1B72C4',btn:'#B0D3F0',btnfg:'#16405F',fg:'#0E2C47',card:'#DCEDFA',track:'#DCEDFA',prog:'#1B72C4',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#FFFFFF',title:'#0E2C47',inv:'none',good:'#12864A',goodfg:'#FFFFFF',gold:'#B07400',flame:'#E0670A'},
 Lavender:{dot:'#DDD4F2',bg:'#F7F4FE',snake:'#2E1F5C',acc:'#7040D8',btn:'#D0C4F0',btnfg:'#3B2A70',fg:'#2A1B52',card:'#EBE5FA',track:'#EBE5FA',prog:'#7040D8',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#FFFFFF',title:'#2A1B52',inv:'none',good:'#12864A',goodfg:'#FFFFFF',gold:'#B07400',flame:'#E0670A'},
 Peach:{dot:'#F2D9CB',bg:'#FFF6F1',snake:'#4A2316',acc:'#C8401F',btn:'#F3C4AB',btnfg:'#5E2E1B',fg:'#43200F',card:'#FCE3D4',track:'#FCE3D4',prog:'#C8401F',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#FFFFFF',title:'#43200F',inv:'none',good:'#12864A',goodfg:'#FFFFFF',gold:'#B07400',flame:'#E0670A'},
 Sakura:{dot:'#F2D6E4',bg:'#FFF5FA',snake:'#4B1D3F',acc:'#C42E8D',btn:'#F1C2DA',btnfg:'#6A2A58',fg:'#4A1D3E',card:'#FBE2EE',track:'#FBE2EE',prog:'#C42E8D',heart:'#FF4B5E',bad:'#FF2A2A',pfg:'#FFFFFF',title:'#4A1D3E',inv:'none',good:'#12864A',goodfg:'#FFFFFF',gold:'#B07400',flame:'#E0670A'}};
const dark=matchMedia('(prefers-color-scheme: dark)').matches;
let P=Object.assign({level:1,theme:dark?'Night':'Day',speed:'Medium',fill:false,lang:(navigator.language||'').slice(0,2)==='fa'?'fa':'en',streak:0,lastDay:'',xp:0,daily:{},shapes:{},stars:{},ach:{},cb:false,hc:false,stats:{}},JSON.parse(localStorage.getItem('arrow-zen')||'{}'));
if(!THEMES[P.theme])P.theme='Night';
P.shapes=Object.fromEntries(Object.keys(P.shapes||{}).filter(k=>SHAPES.includes(k)).map(k=>[k,1]));
P.stats=Object.assign({cleared:0,perfect:0,pure:0,close:0,big:0,hints:0,undos:0,bestStreak:0,months:0,taBest:0,endBest:0,arrows:0,flawless:0,bestCombo:0},P.stats);
P.items=Object.assign({hints:5,refills:3},P.items);P.sm=P.sm||{};P.smd=P.smd||{};for(const mk of['shapes','sm','smd'])for(const k in P[mk])if(!SHAPES.includes(k))delete P[mk][k];P.dstreak=Object.assign({n:0,best:0,last:''},P.dstreak);P.rem=Object.assign({on:false,hour:20,last:''},P.rem);P.name=P.name||('Zen'+(100+Math.random()*900|0));P.avatar=P.avatar||0;
const SHAPE_ORDER=["e_1f371", "e_1f3e5", "mi_bookmark", "e_1f3e2", "e_1fa73", "e_1fab5", "e_1f42f", "e_1f68c", "e_1f392", "e_1f3ac", "e_1f3b2", "e_1f354", "mi_hourglass_full", "e_1f439", "e_1f5fa", "e_1f5a5", "e_1f466", "mi_book", "e_1f3e4", "e_1f3db", "e_1f33a", "e_1f3b3", "e_1f4fa", "e_1f9ca", "e_1f3ea", "e_1f45b", "e_1f3eb", "e_1f3c8", "e_1f476", "e_26fd", "e_1f9fa", "e_1f9c2", "e_1f465", "e_1f428", "e_1f9ed", "mi_hexagon", "mi_cloud", "mi_breakfast_dining", "e_1f981", "e_1f41a", "e_1faba", "e_1f9e0", "e_1f989", "e_1f69a", "e_1f99d", "e_1f33c", "e_1f3df", "e_1f9fc", "e_1f9c1", "e_1f697", "e_1f3a5", "e_1f686", "e_1f684", "e_1f370", "e_1f484", "e_1f37f", "e_1fada", "e_1f48d", "e_1f365", "e_1f399", "e_1f3a8", "e_1f9e3", "e_1f349", "e_1f34d", "e_1f9c0", "e_1f9a5", "e_270c", "e_1f3ae", "e_1f483", "e_1f3a9", "e_1f34b", "e_1f9a3", "e_1f363", "e_1f467", "e_1f32e", "e_1f35f", "e_1f367", "e_1f453", "e_1f419", "e_1f420", "mi_shopping_bag", "e_1f478", "e_1f411", "e_1f695", "e_1f34e", "e_1f47b", "e_1f4a1", "e_1f36f", "mi_pentagon", "e_1f9aa", "e_1f375", "e_1f43a", "mi_backpack", "e_1f344", "e_1f9c3", "e_1f339", "e_1f6a2", "e_1f983", "e_1f4a7", "e_1f427", "e_1f42d", "e_1f337", "e_1f3d9", "e_1f994", "e_1f338", "e_1f682", "e_1f98f", "e_1f4b0", "e_1f9c5", "e_1f4da", "e_1f5fb", "e_1f993", "e_1f422", "e_1fad0", "e_1f42b", "mi_favorite", "e_1f9e5", "e_2601", "e_1f6a4", "e_1f40f", "e_2660", "e_1f455", "e_1f355", "e_1f56f", "e_1f98d", "e_1f9f8", "e_1f348", "e_1f451", "e_1f415", "e_1f9cb", "e_1fac0", "e_1f431", "e_1f40c", "e_1f99b", "e_1f464", "e_1f98a", "e_1f46b", "e_2744", "e_1fa86", "e_1f42e", "e_1f3da", "e_1fac1", "e_1f366", "e_1fabd", "e_1f423", "e_26f8", "e_1f3c5", "e_1f980", "mi_savings", "e_1fad1", "e_1f44d", "e_1f481", "e_1f99e", "e_1f44e", "e_1f6c1", "e_1f412", "e_1f3f0", "mi_boy", "e_1f9c7", "e_1f3d5", "e_1f333", "e_1f9e2", "e_26f2", "mi_lightbulb", "e_1f578", "e_1f350", "e_1f3e1", "e_1f410", "mi_medical_services", "e_26c5", "e_1f43f", "e_1f409", "e_1f99a", "e_1f32d", "e_1f9ad", "e_1f69c", "e_1f414", "e_1f417", "e_1faa2", "e_1f9a7", "e_1f35c", "e_1f48e", "e_1f3ef", "e_1f3d3", "e_1f430", "e_1f9a6", "e_1f9ac", "e_1f514", "e_1f432", "e_1f68a", "e_1f9a1", "e_1f340", "mi_brightness_2", "e_1f525", "e_1f368", "e_1f33b", "e_1f388", "e_1f98c", "e_1f44f", "e_1f508", "mi_free_breakfast", "e_1f382", "e_1fad4", "e_1f32f", "e_1f372", "mi_egg", "e_1f9c9", "e_1fabc", "e_2640", "e_1f356", "e_1f4ce", "e_1fa83", "mi_extension", "e_1f360", "e_2615", "mi_water_drop", "mi_man", "e_1f434", "e_1f984", "mi_directions_railway_filled", "e_265f", "e_1fad6", "e_1f352", "e_1f418", "e_1f3d8", "mi_local_movies", "e_1f33d", "mi_nature", "mi_timer", "mi_fort", "mi_local_shipping", "e_1f3cd", "e_1f3d4", "mi_castle", "e_1f9ab", "e_1fa90", "mi_cookie", "e_1f46f", "e_1f403", "e_1f42c", "e_1f9f3", "e_1f9a2", "e_1f9c8", "e_1fa87", "e_1f347", "e_1f380", "e_1f41f", "e_1f42a", "e_1f991", "mi_sports_esports", "e_1f457", "e_1f48a", "e_2668", "mi_notifications", "e_1f34c", "e_1f41d", "e_1f4aa", "e_1f404", "mi_local_mall", "mi_local_hospital", "e_1f40e", "mi_local_library", "e_1f9c4", "e_1f401", "e_1f47c", "e_1f335", "e_1f579", "e_1f52c", "e_1f407", "e_1f982", "mi_thumb_up", "e_2699", "e_1f424", "e_1f9f6", "e_1f44b", "e_1fadb", "e_1f987", "e_1f421", "e_1f40b", "e_1f425", "mi_camera_alt", "e_1f37c", "e_26f5", "e_1f3f7", "e_1f529", "e_1f341", "e_2618", "mi_flash_on", "e_1f393", "mi_king_bed", "e_1f4d0", "mi_festival", "e_1f332", "e_1f40a", "e_1f364", "mi_egg_alt", "mi_local_pharmacy", "e_1f460", "e_1f402", "e_1f3c6", "e_1f54a", "e_1f5de", "e_1f6b2", "e_1f36d", "e_1f3ce", "mi_warehouse", "e_1f3c1", "e_1f3bf", "e_1f346", "mi_bed", "mi_directions_subway_filled", "e_1f511", "e_1f405", "e_1f384", "e_1f41e", "e_1f36b", "e_1fad7", "e_2642", "mi_science", "e_1fab6", "e_2712", "e_1f35d", "e_1f3c7", "e_1f40d", "mi_home", "e_1f99c", "mi_emoji_emotions", "e_1f426", "e_1f400", "e_1f992", "mi_smart_toy", "e_1f985", "e_1f9a4", "e_1f33f", "e_1fab0", "mi_directions_bus_filled", "mi_palette", "e_1fab4", "e_1face", "mi_local_police", "e_1f50d", "e_1f9e9", "e_1fad2", "e_1fae7", "e_1f429", "mi_factory", "e_1f408", "mi_cottage", "e_1fab8", "e_1f680", "e_1f334", "e_1f413", "mi_girl", "e_1f3dd", "mi_park", "e_1f986", "mi_shopping_basket", "e_2603", "mi_emoji_objects", "mi_iron", "e_1f996", "e_270f", "e_1f999", "e_1f41b", "e_1f9a8", "mi_bathtub", "e_1f357", "mi_woman", "e_1f406", "mi_table_restaurant", "e_1f3b7", "e_26c8", "mi_directions_car_filled", "e_1f9ae", "e_1f516", "mi_museum", "e_1fad8", "mi_music_note", "e_1f98b", "mi_store", "mi_emoji_events", "e_1f336", "e_1f331", "e_1f5fd", "e_1f30b", "mi_volcano", "mi_bug_report", "e_1f3be", "mi_wallet", "e_1f36c", "e_1f3d7", "e_1f50c", "mi_brightness_3", "mi_bungalow", "mi_landscape", "e_1f4cc", "mi_thunderstorm", "e_1f3c4", "e_1f47e", "e_1f9ea", "mi_speaker", "e_1f988", "e_1fa91", "mi_ice_skating", "mi_icecream", "mi_local_drink", "e_1fabf", "e_1f362", "e_1facf", "mi_emoji_food_beverage", "e_2708", "e_1f33e", "e_1f3a7", "mi_auto_stories", "e_1fab2", "e_2602", "e_1f3bc", "e_1f433", "e_1f98e", "e_1fad5", "mi_toys", "e_1f998", "e_1fab1", "e_1f3c2", "e_1f995", "e_1f3ba", "mi_coffee", "mi_grade", "mi_local_pizza", "mi_psychology", "mi_shower", "mi_sports_football", "e_1f3cc", "mi_traffic", "mi_rice_bowl", "mi_key", "e_1f31f", "e_1f997", "e_1f681", "e_1f41c", "mi_pest_control", "mi_local_fire_department", "e_1f490", "mi_stadium", "mi_brightness_4", "e_1f9a9", "mi_whatshot", "mi_luggage", "mi_opacity", "mi_local_taxi", "mi_garage", "mi_local_laundry_service", "mi_directions_boat", "e_2693", "mi_blender", "mi_tram", "mi_apartment", "e_26f9", "e_2604", "mi_local_gas_station", "mi_fire_truck", "mi_radio", "e_2692", "mi_airport_shuttle", "e_2696", "e_1f46a", "mi_headphones", "e_1fa81", "mi_snowmobile", "e_1f3bb", "mi_cruelty_free", "mi_single_bed", "e_1f6a3", "mi_pest_control_rodent", "mi_desk", "mi_soap", "e_1f990", "mi_umbrella", "mi_delivery_dining", "mi_laptop", "e_26f7", "mi_fence", "mi_piano", "mi_brightness_7", "mi_chair_alt", "mi_directions_walk", "e_1f3ca", "mi_microwave", "e_1fab3", "mi_two_wheeler", "mi_business", "e_1fa85", "e_1f493", "mi_electric_rickshaw", "mi_hot_tub", "e_1f577", "mi_set_meal", "mi_language", "mi_cabin", "mi_pedal_bike"],SM_BOARDS=10,smTier=n=>Math.min(2,Math.floor(SHAPE_ORDER.indexOf(n)*3/SHAPE_ORDER.length)),TIERK=['easy','medium','hard'];
const SHAPE_FA={"mi_bed": "تخت", "mi_bathtub": "وان", "mi_blender": "مخلوط‌کن", "mi_book": "کتاب", "mi_bookmark": "نشانک", "mi_brightness_2": "ماه روشن", "mi_brightness_3": "هلال ماه", "mi_brightness_4": "روشنایی ۴", "mi_brightness_7": "خورشید روشن", "mi_bug_report": "گزارش حشره", "mi_castle": "قلعه", "mi_chair_alt": "صندلی", "mi_cloud": "ابر", "mi_coffee": "قهوه", "mi_cookie": "کلوچه", "mi_desk": "میز کار", "mi_egg": "تخم‌مرغ", "mi_egg_alt": "تخم‌مرغ ۲", "mi_extension": "قطعه‌ی پازل", "mi_factory": "کارخانه", "mi_favorite": "قلب", "mi_fence": "حصار", "mi_fire_truck": "ماشین آتش‌نشانی", "mi_flash_on": "برق", "mi_fort": "دژ", "mi_garage": "گاراژ", "mi_grade": "ستاره", "mi_headphones": "هدفون", "mi_hexagon": "شش‌ضلعی", "mi_home": "خانه", "mi_hourglass_full": "ساعت شنی پر", "mi_hot_tub": "جکوزی", "mi_icecream": "بستنی", "mi_iron": "اتو", "mi_key": "کلید", "mi_king_bed": "تخت دو نفره", "mi_landscape": "منظره", "mi_language": "کره‌ی زمین", "mi_laptop": "لپ‌تاپ", "mi_lightbulb": "لامپ", "mi_local_drink": "لیوان آب", "mi_local_fire_department": "شعله", "mi_local_gas_station": "پمپ بنزین", "mi_local_hospital": "بیمارستان", "mi_local_laundry_service": "لباسشویی", "mi_local_library": "کتابخانه", "mi_local_mall": "پاساژ", "mi_local_movies": "سینما", "mi_local_pharmacy": "داروخانه", "mi_local_pizza": "پیتزا", "mi_local_police": "پلیس", "mi_local_shipping": "کامیون", "mi_local_taxi": "تاکسی", "mi_luggage": "چمدان", "mi_medical_services": "کیف کمک‌های اولیه", "mi_microwave": "مایکروفر", "mi_museum": "موزه", "mi_music_note": "نت موسیقی", "mi_nature": "درخت", "mi_notifications": "زنگ اعلان", "mi_opacity": "قطره‌ی رنگ", "mi_palette": "پالت نقاشی", "mi_park": "پارک", "mi_pedal_bike": "دوچرخه", "mi_pentagon": "پنج‌ضلعی", "mi_piano": "پیانو", "mi_psychology": "ذهن", "mi_radio": "رادیو", "mi_rice_bowl": "کاسه‌ی برنج", "mi_savings": "قلک", "mi_science": "ارلن علمی", "mi_shopping_bag": "کیسه‌ی خرید", "mi_shopping_basket": "سبد", "mi_shower": "دوش", "mi_single_bed": "تخت یک‌نفره", "mi_smart_toy": "ربات", "mi_snowmobile": "موتور برفی", "mi_soap": "صابون", "mi_speaker": "بلندگو", "mi_sports_esports": "دسته‌ی بازی", "mi_sports_football": "توپ راگبی", "mi_stadium": "ورزشگاه", "mi_store": "فروشگاه", "mi_table_restaurant": "میز رستوران", "mi_thumb_up": "پسند", "mi_thunderstorm": "رعد و برق", "mi_timer": "زمان‌سنج", "mi_toys": "فرفره", "mi_traffic": "چراغ راهنما", "mi_tram": "تراموا", "mi_two_wheeler": "موتورسیکلت", "mi_umbrella": "چتر", "mi_volcano": "آتشفشان", "mi_wallet": "کیف پول", "mi_warehouse": "انبار بزرگ", "mi_water_drop": "قطره‌ی آب", "mi_whatshot": "آتش", "mi_woman": "زن", "mi_man": "مرد", "mi_boy": "پسر", "mi_girl": "دختر", "mi_cabin": "کلبه‌ی چوبی", "mi_cottage": "کلبه", "mi_bungalow": "خانه‌ی ویلایی", "mi_apartment": "آپارتمان", "mi_business": "ساختمان اداری", "mi_airport_shuttle": "ون فرودگاه", "mi_directions_boat": "قایق", "mi_directions_bus_filled": "اتوبوس", "mi_directions_car_filled": "ماشین", "mi_directions_railway_filled": "قطار", "mi_directions_subway_filled": "مترو", "mi_directions_walk": "عابر پیاده", "mi_electric_rickshaw": "ریکشای برقی", "mi_emoji_events": "جام قهرمانی", "mi_emoji_objects": "لامپ ایده", "mi_emoji_food_beverage": "نوشیدنی", "mi_emoji_emotions": "شکلک خندان", "mi_festival": "جشنواره", "mi_free_breakfast": "چای صبحانه", "mi_ice_skating": "اسکیت روی یخ", "mi_pest_control": "حشره", "mi_pest_control_rodent": "موش", "mi_cruelty_free": "خرگوش مهربان", "mi_set_meal": "غذای دریایی", "mi_breakfast_dining": "صبحانه", "mi_delivery_dining": "پیک موتوری", "mi_backpack": "کوله‌پشتی", "mi_auto_stories": "داستان خودکار", "mi_camera_alt": "دوربین", "e_1f400": "موش صحرایی", "e_1f401": "موش", "e_1f402": "گاو نر", "e_1f403": "گاومیش", "e_1f404": "گاو", "e_1f405": "ببر", "e_1f406": "پلنگ", "e_1f407": "خرگوش", "e_1f408": "گربه", "e_1f409": "اژدها", "e_1f40a": "تمساح", "e_1f40b": "نهنگ", "e_1f40c": "حلزون", "e_1f40d": "مار", "e_1f40e": "اسب", "e_1f40f": "قوچ", "e_1f410": "بز", "e_1f411": "گوسفند", "e_1f412": "میمون", "e_1f413": "خروس", "e_1f414": "مرغ", "e_1f415": "سگ", "e_1f417": "گراز", "e_1f418": "فیل", "e_1f419": "هشت‌پا", "e_1f41a": "صدف مارپیچ", "e_1f41b": "حشره", "e_1f41c": "مورچه", "e_1f41d": "زنبور عسل", "e_1f41e": "کفشدوزک", "e_1f41f": "ماهی", "e_1f420": "ماهی گرمسیری", "e_1f421": "ماهی بادکنکی", "e_1f422": "لاک‌پشت", "e_1f423": "جوجه‌ی در حال بیرون آمدن", "e_1f424": "جوجه", "e_1f425": "جوجه‌ی روبه‌رو", "e_1f426": "پرنده", "e_1f427": "پنگوئن", "e_1f428": "کوآلا", "e_1f429": "سگ پشمالو", "e_1f42a": "شتر یک‌کوهانه", "e_1f42b": "شتر دوکوهانه", "e_1f42c": "دلفین", "e_1f42d": "صورت موش", "e_1f42e": "صورت گاو", "e_1f42f": "صورت ببر", "e_1f430": "صورت خرگوش", "e_1f431": "صورت گربه", "e_1f432": "صورت اژدها", "e_1f433": "نهنگ فواره‌زن", "e_1f434": "صورت اسب", "e_1f439": "همستر", "e_1f43a": "گرگ", "e_1f43f": "سنجاب راه‌راه", "e_1f980": "خرچنگ", "e_1f981": "شیر", "e_1f982": "عقرب", "e_1f983": "بوقلمون", "e_1f984": "تک‌شاخ", "e_1f985": "عقاب", "e_1f986": "اردک", "e_1f987": "خفاش", "e_1f988": "کوسه", "e_1f989": "جغد", "e_1f98a": "روباه", "e_1f98b": "پروانه", "e_1f98c": "گوزن", "e_1f98d": "گوریل", "e_1f98e": "مارمولک", "e_1f98f": "کرگدن", "e_1f990": "میگو", "e_1f991": "ماهی مرکب", "e_1f992": "زرافه", "e_1f993": "گورخر", "e_1f994": "خارپشت", "e_1f995": "دایناسور گردن‌دراز", "e_1f996": "دایناسور تی‌رکس", "e_1f997": "جیرجیرک", "e_1f998": "کانگورو", "e_1f999": "لاما", "e_1f99a": "طاووس", "e_1f99b": "اسب آبی", "e_1f99c": "طوطی", "e_1f99d": "راکون", "e_1f99e": "خرچنگ دراز", "e_1f9a1": "گورکن", "e_1f9a2": "قو", "e_1f9a3": "ماموت", "e_1f9a4": "دودو", "e_1f9a5": "تنبل", "e_1f9a6": "سمور آبی", "e_1f9a7": "اورانگوتان", "e_1f9a8": "راسو", "e_1f9a9": "فلامینگو", "e_1f9aa": "صدف", "e_1f9ab": "سگ آبی", "e_1f9ac": "گاو کوهان‌دار", "e_1f9ad": "فک", "e_1f9ae": "سگ راهنما", "e_1f9c0": "پنیر", "e_1f9c1": "کاپ‌کیک", "e_1f9c2": "نمک‌پاش", "e_1f9c3": "پاکت نوشیدنی", "e_1f9c4": "سیر", "e_1f9c5": "پیاز", "e_1f9c7": "وافل", "e_1f9c8": "کره", "e_1f9c9": "نوشیدنی ماته", "e_1f9ca": "یخ", "e_1f9cb": "چای حبابی", "e_1f331": "نهال", "e_1f332": "کاج", "e_1f333": "درخت", "e_1f334": "نخل", "e_1f335": "کاکتوس", "e_1f336": "فلفل تند", "e_1f337": "لاله", "e_1f338": "شکوفه‌ی گیلاس", "e_1f339": "گل رز", "e_1f33a": "ختمی", "e_1f33b": "آفتابگردان", "e_1f33c": "شکوفه", "e_1f33d": "بلال", "e_1f33e": "خوشه‌ی برنج", "e_1f33f": "سبزی", "e_1f340": "شبدر چهاربرگ", "e_1f341": "برگ افرا", "e_1f344": "قارچ", "e_1f346": "بادمجان", "e_1f347": "انگور", "e_1f348": "خربزه", "e_1f349": "هندوانه", "e_1f34b": "لیمو", "e_1f34c": "موز", "e_1f34d": "آناناس", "e_1f34e": "سیب", "e_1f350": "گلابی", "e_1f352": "گیلاس", "e_1f354": "همبرگر", "e_1f355": "پیتزا", "e_1f356": "گوشت استخوانی", "e_1f357": "ران مرغ", "e_1f35c": "کاسه‌ی داغ", "e_1f35d": "اسپاگتی", "e_1f35f": "سیب‌زمینی سرخ‌کرده", "e_1f360": "سیب‌زمینی شیرین", "e_1f362": "اودن", "e_1f363": "سوشی", "e_1f364": "میگوی سرخ‌شده", "e_1f365": "کیک ماهی", "e_1f366": "بستنی قیفی", "e_1f367": "یخ رنده‌شده", "e_1f368": "بستنی", "e_1f36b": "شکلات", "e_1f36c": "آبنبات", "e_1f36d": "آبنبات چوبی", "e_1f36f": "ظرف عسل", "e_1f370": "کیک شورت", "e_1f371": "جعبه‌ی غذا", "e_1f372": "قابلمه‌ی غذا", "e_1f375": "فنجان چای", "e_1f37c": "شیشه‌ی شیر", "e_1f37f": "پاپ‌کورن", "e_1f380": "روبان", "e_1f382": "کیک تولد", "e_1f384": "درخت کریسمس", "e_1f388": "بادکنک", "e_1f392": "کیف مدرسه", "e_1f393": "کلاه فارغ‌التحصیلی", "e_1f399": "میکروفون استودیو", "e_1f3a5": "دوربین فیلم‌برداری", "e_1f3a7": "هدفون", "e_1f3a8": "پالت نقاشی", "e_1f3a9": "کلاه سیلندر", "e_1f3ac": "کلاکت", "e_1f3ae": "دسته‌ی بازی", "e_1f3b2": "تاس", "e_1f3b3": "بولینگ", "e_1f3b7": "ساکسوفون", "e_1f3ba": "ترومپت", "e_1f3bb": "ویولن", "e_1f3bc": "نت‌نویسی", "e_1f3be": "راکت تنیس", "e_1f3bf": "اسکی", "e_1f3c1": "پرچم شطرنجی", "e_1f3c2": "اسنوبرد", "e_1f3c4": "موج‌سوار", "e_1f3c5": "مدال ورزشی", "e_1f3c6": "جام", "e_1f3c7": "اسب‌دوانی", "e_1f3c8": "توپ فوتبال آمریکایی", "e_1f3ca": "شناگر", "e_1f3cc": "گلف‌باز", "e_1f3cd": "موتور مسابقه", "e_1f3ce": "ماشین مسابقه", "e_1f3d3": "راکت پینگ‌پنگ", "e_1f3d4": "کوه برفی", "e_1f3d5": "کمپ", "e_1f3d7": "ساختمان‌سازی", "e_1f3d8": "خانه‌ها", "e_1f3d9": "شهر", "e_1f3da": "خانه‌ی متروکه", "e_1f3db": "بنای کلاسیک", "e_1f3dd": "جزیره‌ی بیابانی", "e_1f3df": "ورزشگاه", "e_1f3e1": "خانه‌ی باغ‌دار", "e_1f3e2": "ساختمان اداری", "e_1f3e4": "پستخانه", "e_1f3e5": "بیمارستان", "e_1f3ea": "مغازه", "e_1f3eb": "مدرسه", "e_1f3ef": "قلعه‌ی ژاپنی", "e_1f3f0": "قلعه", "e_1f3f7": "برچسب", "e_1f44b": "دست تکان‌دهنده", "e_1f44d": "شست بالا", "e_1f44e": "شست پایین", "e_1f44f": "دست زدن", "e_1f451": "تاج پادشاهی", "e_1f453": "عینک", "e_1f455": "تی‌شرت", "e_1f457": "لباس", "e_1f45b": "کیف دستی", "e_1f460": "کفش پاشنه‌بلند", "e_1f464": "نیم‌تنه", "e_1f465": "دو نیم‌تنه", "e_1f466": "پسر", "e_1f467": "دختر", "e_1f46a": "خانواده", "e_1f46b": "زن و مرد", "e_1f46f": "زن با گوش خرگوشی", "e_1f476": "نوزاد", "e_1f478": "شاهزاده", "e_1f47b": "روح", "e_1f47c": "فرشته‌ی کوچک", "e_1f47e": "هیولای فضایی", "e_1f481": "متصدی اطلاعات", "e_1f483": "رقصنده", "e_1f484": "رژ لب", "e_1f48a": "قرص", "e_1f48d": "حلقه", "e_1f48e": "سنگ قیمتی", "e_1f490": "دسته‌گل", "e_1f493": "قلب تپنده", "e_1f4a1": "لامپ", "e_1f4a7": "قطره", "e_1f4aa": "بازوی ورزیده", "e_1f4b0": "کیسه‌ی پول", "e_1f4cc": "پونز", "e_1f4ce": "گیره‌ی کاغذ", "e_1f4d0": "گونیا", "e_1f4da": "کتاب‌ها", "e_1f4fa": "تلویزیون", "e_1f508": "بلندگو", "e_1f50c": "دوشاخه", "e_1f50d": "ذره‌بین چپ", "e_1f511": "کلید", "e_1f514": "زنگ", "e_1f516": "نشانک", "e_1f525": "آتش", "e_1f529": "پیچ و مهره", "e_1f52c": "میکروسکوپ", "e_1f54a": "کبوتر صلح", "e_1f56f": "شمع", "e_1f577": "عنکبوت", "e_1f578": "تار عنکبوت", "e_1f579": "جوی‌استیک", "e_1f5a5": "رایانه‌ی رومیزی", "e_1f5de": "روزنامه‌ی لوله‌شده", "e_1f5fa": "نقشه‌ی جهان", "e_1f5fb": "کوه فوجی", "e_1f5fd": "مجسمه‌ی آزادی", "e_1f680": "موشک", "e_1f681": "هلیکوپتر", "e_1f682": "لوکوموتیو بخار", "e_1f684": "قطار سریع‌السیر", "e_1f686": "قطار", "e_1f68a": "تراموا", "e_1f68c": "اتوبوس", "e_1f695": "تاکسی", "e_1f697": "ماشین", "e_1f69a": "کامیون باربری", "e_1f69c": "تراکتور", "e_1f6a2": "کشتی", "e_1f6a3": "قایق پارویی", "e_1f6a4": "قایق موتوری", "e_1f6b2": "دوچرخه", "e_1f6c1": "وان", "e_2601": "ابر", "e_2602": "چتر", "e_2603": "آدم برفی", "e_2604": "ستاره‌ی دنباله‌دار", "e_2615": "نوشیدنی داغ", "e_2618": "شبدر", "e_2640": "نماد زن", "e_2642": "نماد مرد", "e_265f": "پیاده‌ی شطرنج", "e_2660": "خال پیک", "e_2668": "چشمه‌ی آب گرم", "e_2692": "چکش و کلنگ", "e_2693": "لنگر", "e_2696": "ترازو", "e_2699": "چرخ‌دنده", "e_26c5": "خورشید پشت ابر", "e_26c8": "ابر رعد و برق", "e_26f2": "فواره", "e_26f5": "قایق بادبانی", "e_26f7": "اسکی‌باز", "e_26f8": "اسکیت روی یخ", "e_26f9": "بازیکن با توپ", "e_26fd": "پمپ بنزین", "e_2708": "هواپیما", "e_270c": "دست پیروزی", "e_270f": "مداد", "e_2712": "نوک قلم", "e_2744": "دانه‌ی برف", "e_1f30b": "آتشفشان", "e_1f31f": "ستاره‌ی درخشان", "e_1f32d": "هات‌داگ", "e_1f32e": "تاکو", "e_1f32f": "بوریتو", "e_1f9e0": "مغز", "e_1f9e2": "کلاه لبه‌دار", "e_1f9e3": "شال‌گردن", "e_1f9e5": "پالتو", "e_1f9e9": "قطعه‌ی پازل", "e_1f9ea": "لوله‌ی آزمایش", "e_1f9ed": "قطب‌نما", "e_1f9f3": "چمدان", "e_1f9f6": "کلاف نخ", "e_1f9f8": "خرس عروسکی", "e_1f9fa": "سبد", "e_1f9fc": "صابون", "e_1fa73": "شلوارک", "e_1fa81": "بادبادک", "e_1fa83": "بومرنگ", "e_1fa85": "پینیاتا", "e_1fa86": "عروسک‌های تودرتو", "e_1fa87": "ماراکاس", "e_1fa90": "سیاره‌ی حلقه‌دار", "e_1fa91": "صندلی", "e_1faa2": "گره", "e_1fab0": "مگس", "e_1fab1": "کرم", "e_1fab2": "سوسک", "e_1fab3": "سوسک سیاه", "e_1fab4": "گلدان", "e_1fab5": "چوب", "e_1fab6": "پر", "e_1fab8": "مرجان", "e_1faba": "لانه‌ی تخم‌دار", "e_1fabc": "عروس دریایی", "e_1fabd": "بال", "e_1fabf": "غاز", "e_1fac0": "قلب", "e_1fac1": "ریه‌ها", "e_1face": "گوزن شمالی", "e_1facf": "الاغ", "e_1fad0": "بلوبری", "e_1fad1": "فلفل دلمه‌ای", "e_1fad2": "زیتون", "e_1fad4": "تامالی", "e_1fad5": "فوندو", "e_1fad6": "قوری", "e_1fad7": "ریختن مایع", "e_1fad8": "لوبیا", "e_1fada": "زنجبیل", "e_1fadb": "غلاف نخود", "e_1fae7": "حباب‌ها"},SHAPE_EN={"mi_bed": "Bed", "mi_bathtub": "Bathtub", "mi_blender": "Blender", "mi_book": "Book", "mi_bookmark": "Bookmark", "mi_brightness_2": "Brightness 2", "mi_brightness_3": "Brightness 3", "mi_brightness_4": "Brightness 4", "mi_brightness_7": "Brightness 7", "mi_bug_report": "Bug report", "mi_castle": "Castle", "mi_chair_alt": "Chair alt", "mi_cloud": "Cloud", "mi_coffee": "Coffee", "mi_cookie": "Cookie", "mi_desk": "Desk", "mi_egg": "Egg", "mi_egg_alt": "Egg alt", "mi_extension": "Extension", "mi_factory": "Factory", "mi_favorite": "Favorite", "mi_fence": "Fence", "mi_fire_truck": "Fire truck", "mi_flash_on": "Flash on", "mi_fort": "Fort", "mi_garage": "Garage", "mi_grade": "Grade", "mi_headphones": "Headphones", "mi_hexagon": "Hexagon", "mi_home": "Home", "mi_hourglass_full": "Hourglass full", "mi_hot_tub": "Hot tub", "mi_icecream": "Icecream", "mi_iron": "Iron", "mi_key": "Key", "mi_king_bed": "King bed", "mi_landscape": "Landscape", "mi_language": "Language", "mi_laptop": "Laptop", "mi_lightbulb": "Lightbulb", "mi_local_drink": "Local drink", "mi_local_fire_department": "Local fire department", "mi_local_gas_station": "Local gas station", "mi_local_hospital": "Local hospital", "mi_local_laundry_service": "Local laundry service", "mi_local_library": "Local library", "mi_local_mall": "Local mall", "mi_local_movies": "Local movies", "mi_local_pharmacy": "Local pharmacy", "mi_local_pizza": "Local pizza", "mi_local_police": "Local police", "mi_local_shipping": "Local shipping", "mi_local_taxi": "Local taxi", "mi_luggage": "Luggage", "mi_medical_services": "Medical services", "mi_microwave": "Microwave", "mi_museum": "Museum", "mi_music_note": "Music note", "mi_nature": "Nature", "mi_notifications": "Notifications", "mi_opacity": "Opacity", "mi_palette": "Palette", "mi_park": "Park", "mi_pedal_bike": "Pedal bike", "mi_pentagon": "Pentagon", "mi_piano": "Piano", "mi_psychology": "Psychology", "mi_radio": "Radio", "mi_rice_bowl": "Rice bowl", "mi_savings": "Savings", "mi_science": "Science", "mi_shopping_bag": "Shopping bag", "mi_shopping_basket": "Shopping basket", "mi_shower": "Shower", "mi_single_bed": "Single bed", "mi_smart_toy": "Smart toy", "mi_snowmobile": "Snowmobile", "mi_soap": "Soap", "mi_speaker": "Speaker", "mi_sports_esports": "Sports esports", "mi_sports_football": "Sports football", "mi_stadium": "Stadium", "mi_store": "Store", "mi_table_restaurant": "Table restaurant", "mi_thumb_up": "Thumb up", "mi_thunderstorm": "Thunderstorm", "mi_timer": "Timer", "mi_toys": "Toys", "mi_traffic": "Traffic", "mi_tram": "Tram", "mi_two_wheeler": "Two wheeler", "mi_umbrella": "Umbrella", "mi_volcano": "Volcano", "mi_wallet": "Wallet", "mi_warehouse": "Warehouse", "mi_water_drop": "Water drop", "mi_whatshot": "Whatshot", "mi_woman": "Woman", "mi_man": "Man", "mi_boy": "Boy", "mi_girl": "Girl", "mi_cabin": "Cabin", "mi_cottage": "Cottage", "mi_bungalow": "Bungalow", "mi_apartment": "Apartment", "mi_business": "Business", "mi_airport_shuttle": "Airport shuttle", "mi_directions_boat": "Directions boat", "mi_directions_bus_filled": "Directions bus filled", "mi_directions_car_filled": "Directions car filled", "mi_directions_railway_filled": "Directions railway filled", "mi_directions_subway_filled": "Directions subway filled", "mi_directions_walk": "Directions walk", "mi_electric_rickshaw": "Electric rickshaw", "mi_emoji_events": "Emoji events", "mi_emoji_objects": "Emoji objects", "mi_emoji_food_beverage": "Emoji food beverage", "mi_emoji_emotions": "Emoji emotions", "mi_festival": "Festival", "mi_free_breakfast": "Free breakfast", "mi_ice_skating": "Ice skating", "mi_pest_control": "Pest control", "mi_pest_control_rodent": "Pest control rodent", "mi_cruelty_free": "Cruelty free", "mi_set_meal": "Set meal", "mi_breakfast_dining": "Breakfast dining", "mi_delivery_dining": "Delivery dining", "mi_backpack": "Backpack", "mi_auto_stories": "Auto stories", "mi_camera_alt": "Camera alt", "e_1f400": "Rat", "e_1f401": "Mouse", "e_1f402": "Ox", "e_1f403": "Water buffalo", "e_1f404": "Cow", "e_1f405": "Tiger", "e_1f406": "Leopard", "e_1f407": "Rabbit", "e_1f408": "Cat", "e_1f409": "Dragon", "e_1f40a": "Crocodile", "e_1f40b": "Whale", "e_1f40c": "Snail", "e_1f40d": "Snake", "e_1f40e": "Horse", "e_1f40f": "Ram", "e_1f410": "Goat", "e_1f411": "Sheep", "e_1f412": "Monkey", "e_1f413": "Rooster", "e_1f414": "Chicken", "e_1f415": "Dog", "e_1f417": "Boar", "e_1f418": "Elephant", "e_1f419": "Octopus", "e_1f41a": "Spiral shell", "e_1f41b": "Bug", "e_1f41c": "Ant", "e_1f41d": "Honeybee", "e_1f41e": "Lady beetle", "e_1f41f": "Fish", "e_1f420": "Tropical fish", "e_1f421": "Blowfish", "e_1f422": "Turtle", "e_1f423": "Hatching chick", "e_1f424": "Baby chick", "e_1f425": "Front-facing baby chick", "e_1f426": "Bird", "e_1f427": "Penguin", "e_1f428": "Koala", "e_1f429": "Poodle", "e_1f42a": "Dromedary camel", "e_1f42b": "Bactrian camel", "e_1f42c": "Dolphin", "e_1f42d": "Mouse face", "e_1f42e": "Cow face", "e_1f42f": "Tiger face", "e_1f430": "Rabbit face", "e_1f431": "Cat face", "e_1f432": "Dragon face", "e_1f433": "Spouting whale", "e_1f434": "Horse face", "e_1f439": "Hamster face", "e_1f43a": "Wolf face", "e_1f43f": "Chipmunk", "e_1f980": "Crab", "e_1f981": "Lion face", "e_1f982": "Scorpion", "e_1f983": "Turkey", "e_1f984": "Unicorn face", "e_1f985": "Eagle", "e_1f986": "Duck", "e_1f987": "Bat", "e_1f988": "Shark", "e_1f989": "Owl", "e_1f98a": "Fox face", "e_1f98b": "Butterfly", "e_1f98c": "Deer", "e_1f98d": "Gorilla", "e_1f98e": "Lizard", "e_1f98f": "Rhinoceros", "e_1f990": "Shrimp", "e_1f991": "Squid", "e_1f992": "Giraffe face", "e_1f993": "Zebra face", "e_1f994": "Hedgehog", "e_1f995": "Sauropod", "e_1f996": "T-rex", "e_1f997": "Cricket", "e_1f998": "Kangaroo", "e_1f999": "Llama", "e_1f99a": "Peacock", "e_1f99b": "Hippopotamus", "e_1f99c": "Parrot", "e_1f99d": "Raccoon", "e_1f99e": "Lobster", "e_1f9a1": "Badger", "e_1f9a2": "Swan", "e_1f9a3": "Mammoth", "e_1f9a4": "Dodo", "e_1f9a5": "Sloth", "e_1f9a6": "Otter", "e_1f9a7": "Orangutan", "e_1f9a8": "Skunk", "e_1f9a9": "Flamingo", "e_1f9aa": "Oyster", "e_1f9ab": "Beaver", "e_1f9ac": "Bison", "e_1f9ad": "Seal", "e_1f9ae": "Guide dog", "e_1f9c0": "Cheese wedge", "e_1f9c1": "Cupcake", "e_1f9c2": "Salt shaker", "e_1f9c3": "Beverage box", "e_1f9c4": "Garlic", "e_1f9c5": "Onion", "e_1f9c7": "Waffle", "e_1f9c8": "Butter", "e_1f9c9": "Mate drink", "e_1f9ca": "Ice cube", "e_1f9cb": "Bubble tea", "e_1f331": "Seedling", "e_1f332": "Evergreen tree", "e_1f333": "Deciduous tree", "e_1f334": "Palm tree", "e_1f335": "Cactus", "e_1f336": "Hot pepper", "e_1f337": "Tulip", "e_1f338": "Cherry blossom", "e_1f339": "Rose", "e_1f33a": "Hibiscus", "e_1f33b": "Sunflower", "e_1f33c": "Blossom", "e_1f33d": "Ear of maize", "e_1f33e": "Ear of rice", "e_1f33f": "Herb", "e_1f340": "Four leaf clover", "e_1f341": "Maple leaf", "e_1f344": "Mushroom", "e_1f346": "Aubergine", "e_1f347": "Grapes", "e_1f348": "Melon", "e_1f349": "Watermelon", "e_1f34b": "Lemon", "e_1f34c": "Banana", "e_1f34d": "Pineapple", "e_1f34e": "Red apple", "e_1f350": "Pear", "e_1f352": "Cherries", "e_1f354": "Hamburger", "e_1f355": "Slice of pizza", "e_1f356": "Meat on bone", "e_1f357": "Poultry leg", "e_1f35c": "Steaming bowl", "e_1f35d": "Spaghetti", "e_1f35f": "French fries", "e_1f360": "Roasted sweet potato", "e_1f362": "Oden", "e_1f363": "Sushi", "e_1f364": "Fried shrimp", "e_1f365": "Fish cake with swirl design", "e_1f366": "Soft ice cream", "e_1f367": "Shaved ice", "e_1f368": "Ice cream", "e_1f36b": "Chocolate bar", "e_1f36c": "Candy", "e_1f36d": "Lollipop", "e_1f36f": "Honey pot", "e_1f370": "Shortcake", "e_1f371": "Bento box", "e_1f372": "Pot of food", "e_1f375": "Teacup without handle", "e_1f37c": "Baby bottle", "e_1f37f": "Popcorn", "e_1f380": "Ribbon", "e_1f382": "Birthday cake", "e_1f384": "Christmas tree", "e_1f388": "Balloon", "e_1f392": "School satchel", "e_1f393": "Graduation cap", "e_1f399": "Studio microphone", "e_1f3a5": "Movie camera", "e_1f3a7": "Headphone", "e_1f3a8": "Artist palette", "e_1f3a9": "Top hat", "e_1f3ac": "Clapper board", "e_1f3ae": "Video game", "e_1f3b2": "Game die", "e_1f3b3": "Bowling", "e_1f3b7": "Saxophone", "e_1f3ba": "Trumpet", "e_1f3bb": "Violin", "e_1f3bc": "Musical score", "e_1f3be": "Tennis racquet and ball", "e_1f3bf": "Ski and ski boot", "e_1f3c1": "Chequered flag", "e_1f3c2": "Snowboarder", "e_1f3c4": "Surfer", "e_1f3c5": "Sports medal", "e_1f3c6": "Trophy", "e_1f3c7": "Horse racing", "e_1f3c8": "American football", "e_1f3ca": "Swimmer", "e_1f3cc": "Golfer", "e_1f3cd": "Racing motorcycle", "e_1f3ce": "Racing car", "e_1f3d3": "Table tennis paddle and ball", "e_1f3d4": "Snow capped mountain", "e_1f3d5": "Camping", "e_1f3d7": "Building construction", "e_1f3d8": "House buildings", "e_1f3d9": "Cityscape", "e_1f3da": "Derelict house building", "e_1f3db": "Classical building", "e_1f3dd": "Desert island", "e_1f3df": "Stadium", "e_1f3e1": "House with garden", "e_1f3e2": "Office building", "e_1f3e4": "European post office", "e_1f3e5": "Hospital", "e_1f3ea": "Convenience store", "e_1f3eb": "School", "e_1f3ef": "Japanese castle", "e_1f3f0": "European castle", "e_1f3f7": "Label", "e_1f44b": "Waving hand sign", "e_1f44d": "Thumbs up sign", "e_1f44e": "Thumbs down sign", "e_1f44f": "Clapping hands sign", "e_1f451": "Crown", "e_1f453": "Eyeglasses", "e_1f455": "T-shirt", "e_1f457": "Dress", "e_1f45b": "Purse", "e_1f460": "High-heeled shoe", "e_1f464": "Bust in silhouette", "e_1f465": "Busts in silhouette", "e_1f466": "Boy", "e_1f467": "Girl", "e_1f46a": "Family", "e_1f46b": "Man and woman holding hands", "e_1f46f": "Woman with bunny ears", "e_1f476": "Baby", "e_1f478": "Princess", "e_1f47b": "Ghost", "e_1f47c": "Baby angel", "e_1f47e": "Alien monster", "e_1f481": "Information desk person", "e_1f483": "Dancer", "e_1f484": "Lipstick", "e_1f48a": "Pill", "e_1f48d": "Ring", "e_1f48e": "Gem stone", "e_1f490": "Bouquet", "e_1f493": "Beating heart", "e_1f4a1": "Electric light bulb", "e_1f4a7": "Droplet", "e_1f4aa": "Flexed biceps", "e_1f4b0": "Money bag", "e_1f4cc": "Pushpin", "e_1f4ce": "Paperclip", "e_1f4d0": "Triangular ruler", "e_1f4da": "Books", "e_1f4fa": "Television", "e_1f508": "Speaker", "e_1f50c": "Electric plug", "e_1f50d": "Left-pointing magnifying glass", "e_1f511": "Key", "e_1f514": "Bell", "e_1f516": "Bookmark", "e_1f525": "Fire", "e_1f529": "Nut and bolt", "e_1f52c": "Microscope", "e_1f54a": "Dove of peace", "e_1f56f": "Candle", "e_1f577": "Spider", "e_1f578": "Spider web", "e_1f579": "Joystick", "e_1f5a5": "Desktop computer", "e_1f5de": "Rolled-up newspaper", "e_1f5fa": "World map", "e_1f5fb": "Mount fuji", "e_1f5fd": "Statue of liberty", "e_1f680": "Rocket", "e_1f681": "Helicopter", "e_1f682": "Steam locomotive", "e_1f684": "High-speed train", "e_1f686": "Train", "e_1f68a": "Tram", "e_1f68c": "Bus", "e_1f695": "Taxi", "e_1f697": "Automobile", "e_1f69a": "Delivery truck", "e_1f69c": "Tractor", "e_1f6a2": "Ship", "e_1f6a3": "Rowboat", "e_1f6a4": "Speedboat", "e_1f6b2": "Bicycle", "e_1f6c1": "Bathtub", "e_2601": "Cloud", "e_2602": "Umbrella", "e_2603": "Snowman", "e_2604": "Comet", "e_2615": "Hot beverage", "e_2618": "Shamrock", "e_2640": "Female sign", "e_2642": "Male sign", "e_265f": "Black chess pawn", "e_2660": "Black spade suit", "e_2668": "Hot springs", "e_2692": "Hammer and pick", "e_2693": "Anchor", "e_2696": "Scales", "e_2699": "Gear", "e_26c5": "Sun behind cloud", "e_26c8": "Thunder cloud and rain", "e_26f2": "Fountain", "e_26f5": "Sailboat", "e_26f7": "Skier", "e_26f8": "Ice skate", "e_26f9": "Person with ball", "e_26fd": "Fuel pump", "e_2708": "Airplane", "e_270c": "Victory hand", "e_270f": "Pencil", "e_2712": "Black nib", "e_2744": "Snowflake", "e_1f30b": "Volcano", "e_1f31f": "Glowing star", "e_1f32d": "Hot dog", "e_1f32e": "Taco", "e_1f32f": "Burrito", "e_1f9e0": "Brain", "e_1f9e2": "Billed cap", "e_1f9e3": "Scarf", "e_1f9e5": "Coat", "e_1f9e9": "Jigsaw puzzle piece", "e_1f9ea": "Test tube", "e_1f9ed": "Compass", "e_1f9f3": "Luggage", "e_1f9f6": "Ball of yarn", "e_1f9f8": "Teddy bear", "e_1f9fa": "Basket", "e_1f9fc": "Bar of soap", "e_1fa73": "Shorts", "e_1fa81": "Kite", "e_1fa83": "Boomerang", "e_1fa85": "Pinata", "e_1fa86": "Nesting dolls", "e_1fa87": "Maracas", "e_1fa90": "Ringed planet", "e_1fa91": "Chair", "e_1faa2": "Knot", "e_1fab0": "Fly", "e_1fab1": "Worm", "e_1fab2": "Beetle", "e_1fab3": "Cockroach", "e_1fab4": "Potted plant", "e_1fab5": "Wood", "e_1fab6": "Feather", "e_1fab8": "Coral", "e_1faba": "Nest with eggs", "e_1fabc": "Jellyfish", "e_1fabd": "Wing", "e_1fabf": "Goose", "e_1fac0": "Anatomical heart", "e_1fac1": "Lungs", "e_1face": "Moose", "e_1facf": "Donkey", "e_1fad0": "Blueberries", "e_1fad1": "Bell pepper", "e_1fad2": "Olive", "e_1fad4": "Tamale", "e_1fad5": "Fondue", "e_1fad6": "Teapot", "e_1fad7": "Pouring liquid", "e_1fad8": "Beans", "e_1fada": "Ginger root", "e_1fadb": "Pea pod", "e_1fae7": "Bubbles"};
const SHAPE_PERM=(()=>{const a=SHAPES.map((_,i)=>i);let s=20260;const r=()=>((s=(Math.imul(s,1664525)+1013904223)>>>0)/4294967296);for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a})();
const shapeName=n=>P.lang==='fa'?(SHAPE_FA[n]||n):(SHAPE_EN[n]||n.charAt(0).toUpperCase()+n.slice(1));
const save=()=>localStorage.setItem('arrow-zen',JSON.stringify(P));
const isLight=()=>THEMES[P.theme].inv==='none';
const dcol=c=>isLight()?mixc(c,'#000000',.4):c;
function theme(){const t=THEMES[P.theme],s=document.documentElement.style,lum=h=>{const c=rgb(h);return(c[0]*299+c[1]*587+c[2]*114)/1000},dk=lum(t.bg)<128,hcFg=dk?'#FFFFFF':'#000000',snake=P.hc?hcFg:t.snake;
 for(const k of['bg','acc','btn','btnfg','fg','card','track','prog','heart','pfg','title','good','goodfg','gold','flame'])s.setProperty('--'+k,t[k]);
 if(P.hc){s.setProperty('--fg',hcFg);s.setProperty('--btnfg',hcFg);s.setProperty('--title',hcFg)}
 s.setProperty('--shapeinv',t.inv);const cl=document.documentElement.classList;cl.toggle('hc',!!P.hc);cl.toggle('cbm',!!P.cb);
 document.querySelector('meta[name=theme-color]').content=t.bg;
 const dist=(a,b)=>{const x=rgb(a),y=rgb(b);return Math.hypot(x[0]-y[0],x[1]-y[1],x[2]-y[2])},bad=P.cb?(dist('#FF8A00',snake)>130?'#FF8A00':'#1FA2FF'):t.bad;
 return{bg:t.bg,acc:t.acc,snake,bad,gold:t.gold,dot:P.hc?mixc(t.bg,snake,.4):(t.dot||mixc(t.bg,t.snake,.18))}}

let dotT=new Map(),winInfo=null,custom=null,curShape=null,prevLives=null,usedHints=0,combo=0,undosLeft=UNDOS,undoStack=[],run=null,runTimer=null,runLast=0,kSel=null,kbdMode=false,lastWin=null,lvl,initial,lives,maxLives,total,won=false,loading=true,flashId=null,flashStart=0,flashT=0,removal=new Map(),bumps=new Map(),freedC=new Set(),entry=new Map(),entering=false,entryTimer=null,
 sc=K.DEFS,ox=0,oy=0,guide=false,guideA=0,guideT=0,guideFrom=0,guideTo=0,win=null,W=0,H=0,dpr=1;
const cv=$('cv'),ctx=cv.getContext('2d');
function resize(){const r=cv.parentElement.getBoundingClientRect(),res=parseFloat(getComputedStyle(cv.parentElement).getPropertyValue('--reserve'))||0;dpr=devicePixelRatio||1;W=r.width;H=Math.max(40,r.height-res);cv.width=W*dpr;cv.height=H*dpr;cv.style.width=W+'px';cv.style.height=H+'px'}
const HEART='M12 21.2c-.4 0-.8-.1-1.1-.4C6.2 16.6 3 13.6 3 9.9 3 7.2 5.1 5 7.8 5c1.7 0 3.3.9 4.2 2.2C12.9 5.9 14.5 5 16.2 5 18.9 5 21 7.2 21 9.9c0 3.7-3.2 6.7-7.9 10.9-.3.3-.7.4-1.1.4z';
const heartSvg=(on,pop)=>`<svg class="hrt ${on?'on':'off'}${pop?' pop':''}" viewBox="0 0 24 24"><path d="${HEART}"${on?' fill="url(#hg)"':''}/>${on?'<path class="gl" d="M7.2 8.4c.5-1.1 1.4-1.7 2.5-1.7"/>':''}</svg>`;
const DIFF=[['easy','#34C77B'],['normal','#5B72FF'],['hard','#FF9F43'],['expert','#FF5B5B'],['super','#E5389B'],['nightmare','#9B5CFF'],['legendary','#FFC83D'],['mythic','#2FE0D0']];
const levelDiff=n=>{const t=levelTier(n),d=DIFF[t];return{k:d[0],c:d[1],t}};
const dg=s=>P.lang==='fa'?String(s).replace(/\d/g,c=>'۰۱۲۳۴۵۶۷۸۹'[c]):String(s);
const fmtT=t=>{const s=Math.ceil(t);return dg(Math.floor(s/60)+':'+String(s%60).padStart(2,'0'))};
function setDiff(){const e=$('diff');
 if(custom&&custom.mode){e.textContent=tt(custom.mode==='ta'?'mode_ta':'mode_end')+' · '+nf(run?run.score:0);e.style.color=dcol('#FF9F43')}
 else if(custom&&custom.daily){e.textContent=tt('diff_daily');e.style.color=dcol('#FF9F43')}
 else if(custom&&custom.sm){e.textContent=shapeName(custom.shape)+' · '+nf(custom.idx+1)+'/'+nf(SM_BOARDS);e.style.color=dcol(DIFF[[0,2,3][custom.tier]][1])}
 else if(custom&&custom.replay){const d=levelDiff(custom.replay);e.textContent=tt('level')+' '+nf(custom.replay)+' · '+tt('diff_'+d.k);e.style.color=dcol(d.c)}
 else if(custom){e.textContent=tt('diff_custom');e.style.color='var(--acc)'}
 else{const d=levelDiff(P.level);e.textContent=tt('diff_'+d.k);e.style.color=dcol(d.c)}}
function hud(){if(!lvl)return;
 if(run&&run.type==='ta')$('lives').innerHTML=`<b class="tm">${fmtT(run.time)}</b>`;
 else{const pop=prevLives!=null&&lives<prevLives?lives:-1;prevLives=lives;$('lives').innerHTML=Array.from({length:maxLives},(_,i)=>heartSvg(i<lives,i===pop)).join('')}
 $('prog').style.width=(total?(total-lvl.snakes.length)/total*100:0)+'%';setDiff();
 $('hintCnt').textContent=nf(P.items.hints);$('hintBtn').disabled=P.items.hints<=0;$('undoCnt').textContent=nf(undosLeft);$('undoBtn').disabled=undosLeft<=0||!undoStack.length}
// ---- save / resume ----
// every mode keeps its own save slot, so "continue" never jumps into another mode's game
const slotOf=c=>!c?'main':c.daily?'daily':c.sm?'sm':c.replay?'replay':c.mode?'run':c.w?'gen':'main',SAVEK=s=>'arrow-zen-save'+(s==='main'?'':'-'+s);
function persist(){if(!lvl||loading||run)return;try{localStorage.setItem(SAVEK(slotOf(custom)),JSON.stringify({n:P.level,custom,shape:curShape,initial,cur:lvl,lives,maxLives,undos:undosLeft,stack:undoStack}))}catch{}}
function clearSave(s){localStorage.removeItem(SAVEK(s||slotOf(custom)))}
function readSave(slot){slot=slot||'main';try{const raw=localStorage.getItem(SAVEK(slot));let s=JSON.parse(raw);
 if(slot==='main'&&s&&s.custom){const k=slotOf(s.custom);if(k!=='main'&&k!=='run'&&!localStorage.getItem(SAVEK(k)))localStorage.setItem(SAVEK(k),raw);localStorage.removeItem(SAVEK('main'));s=null}
 return s&&s.cur&&s.initial&&(slot!=='main'||s.n===P.level)?s:null}catch{return null}}
function startEntry(){clearInterval(entryTimer);entry=new Map();entering=false;const sn=lvl.snakes;if(!sn.length)return;
 const cx=lvl.w/2,cy=lvl.h/2,order=sn.map(s=>{const mx=s.body.reduce((a,p)=>a+p.x,0)/s.body.length,my=s.body.reduce((a,p)=>a+p.y,0)/s.body.length;return[s.id,(mx-cx)**2+(my-cy)**2]}).sort((a,b)=>a[1]-b[1]).map(a=>a[0]);
 const st=Math.min(K.STAGGER,K.MAXSTAG/Math.max(1,order.length-1));entering=true;const t0=performance.now();let ft=0;
 const tick=()=>{const el=Math.max(ft,performance.now()-t0),m=new Map();
  order.forEach((id,i)=>{const l=Math.min(1,Math.max(0,(el-st*i)/K.ENTRY));if(l<1)m.set(id,1-Math.pow(1-l,3))});
  entry=m;if(!m.size){clearInterval(entryTimer);entering=false}ft+=K.FRAME};
 tick();entryTimer=setInterval(tick,K.FRAME)}
function resetView(){sc=K.DEFS;ox=oy=0}
function setLevel(l,ml,cur,ln,x){x=x||{};initial={w:l.w,h:l.h,snakes:l.snakes.slice(),walls:l.walls||null};lvl=cur||{w:l.w,h:l.h,snakes:l.snakes.slice(),walls:l.walls||null};prevLives=null;
 $('regenBtn').hidden=!(custom&&custom.w);$('restartBtn').hidden=!!(custom&&custom.mode);total=l.snakes.length;won=false;maxLives=ml;lives=ln==null?ml:ln;usedHints=0;combo=0;undosLeft=x.undos==null?UNDOS:x.undos;undoStack=x.stack||[];kSel=null;
 flashId=null;removal=new Map();bumps.clear();freedC.clear();resetView();loading=false;$('loadOv').hidden=true;if(document.activeElement&&document.activeElement.blur)document.activeElement.blur();hud();startEntry();win=null;dotT.clear();persist()}
function setProg(p){$('loadBar').style.width=(p*100)+'%'}
function runGen(c,walls,fill,seed,cb){const inline=()=>setTimeout(()=>{setSeed(seed);const l=generate(c.w,c.h,c.maxLen,walls,fill,setProg);setSeed(null);cb(l)},30);let wk;
 try{wk=new Worker('worker.js')}catch{return inline()}
 wk.onmessage=e=>{if(e.data.p!=null)setProg(e.data.p);else{wk.terminate();cb(e.data.level)}};wk.onerror=()=>{wk.terminate();inline()};
 wk.postMessage({w:c.w,h:c.h,maxLen:c.maxLen,walls,fill,seed})}
function loadShape(n){return new Promise(r=>{const im=new Image();im.onload=()=>r(im);im.onerror=()=>r(null);im.src='assets/shapes/'+n+'.png'})}
function wallsFromImage(im,w,h){const c=document.createElement('canvas'),SW=c.width=im.naturalWidth,SH=c.height=im.naturalHeight,x=c.getContext('2d',{willReadFrequently:true});x.drawImage(im,0,0);
 const d=x.getImageData(0,0,SW,SH).data,blk=i=>d[i+3]>K.COLOR_T&&d[i]<K.COLOR_T&&d[i+1]<K.COLOR_T&&d[i+2]<K.COLOR_T;
 let a=SW,b=SH,e=0,f=0,ok=false;for(let yy=0;yy<SH;yy++)for(let xx=0;xx<SW;xx++)if(blk((yy*SW+xx)*4)){ok=true;a=Math.min(a,xx);e=Math.max(e,xx);b=Math.min(b,yy);f=Math.max(f,yy)}
 if(!ok){a=b=0;e=SW-1;f=SH-1}const cw=e-a+1,ch=f-b+1;
 return Array.from({length:w},(_,X)=>Array.from({length:h},(_,Y)=>!blk(((b+Math.min(ch-1,Math.floor(Y*ch/h)))*SW+a+Math.min(cw-1,Math.floor(X*cw/w)))*4)))}
function dailyCfg(day){const seed=parseInt(day.replace(/-/g,''),10);setSeed(seed);const w=16+(rnd()*9|0),h=16+(rnd()*9|0),maxLen=6+(rnd()*7|0),shape=rnd()<.5?SHAPES[rnd()*SHAPES.length|0]:null;setSeed(null);return{seed,w,h,maxLen,shape}}
const campaignSeed=n=>1000003*n+17;
async function newLevel(c){custom=c||null;clearSave();hidePages();$('game').hidden=false;$('winOv').hidden=$('overOv').hidden=true;$('overSub').hidden=true;resize();
 loading=true;lvl=null;setProg(0);$('loadOv').hidden=false;
 let cfg,shape=null,seed=null,fill=P.fill,vv=0;
 if(custom&&custom.daily){const d=dailyCfg(custom.day);cfg={w:d.w,h:d.h,maxLen:d.maxLen,lives:K.LIVES};shape=d.shape;seed=d.seed;fill=false}
 else if(custom&&custom.sm){const T=[{s:[9,12],l:[10,14]},{s:[15,19],l:[8,12]},{s:[24,29],l:[7,11]}][custom.tier],ri=r=>r[0]+(Math.random()*(r[1]-r[0]+1)|0);cfg={w:ri(T.s),h:ri(T.s),maxLen:ri(T.l),lives:3};shape=custom.shape;fill=false}
 else if(custom&&custom.mode){cfg=levelConfig(custom.lv);cfg.lives=3;fill=false}
 else if(custom&&custom.w){cfg=levelConfig(P.level,custom.w,custom.h);shape=custom.shape;if(fill){cfg.w=Math.min(cfg.w,K.MAXFILL);cfg.h=Math.min(cfg.h,K.MAXFILL)}}
 else{const n=custom&&custom.replay?custom.replay:P.level;cfg=levelConfig(n);seed=campaignSeed(n);setSeed(seed);shape=shouldApplyShape(cfg,rnd())?SHAPES[SHAPE_PERM[n%SHAPES.length]]:null;vv=Math.floor(n/SHAPES.length)%8;setSeed(null);if(fill){cfg.w=Math.min(cfg.w,K.MAXFILL);cfg.h=Math.min(cfg.h,K.MAXFILL)}}
 curShape=shape;let walls=null;if(shape){const im=await loadShape(shape);if(im){walls=wallsFromImage(im,cfg.w,cfg.h);if(!custom||custom.replay){const fr=walls.reduce((s,c)=>s+c.filter(v=>!v).length,0)/(cfg.w*cfg.h);cfg.maxLen=Math.max(cfg.tier>=5?2:3,Math.round(cfg.maxLen*Math.min(1,fr+.1)))}
  if(vv){let a=walls;if(vv&4){a=a[0].map((_,y)=>a.map(c=>c[y]));[cfg.w,cfg.h]=[cfg.h,cfg.w]}if(vv&1)a=a.slice().reverse();if(vv&2)a=a.map(c=>c.slice().reverse());walls=a}}}
 runGen(cfg,walls,fill,seed,l=>setLevel(l,cfg.lives,null,custom&&custom.mode==='endless'&&run?run.lives:null))}
function play(slot){slot=typeof slot==='string'?slot:'main';const s=readSave(slot);if(!s)return newLevel();custom=s.custom;curShape=s.shape||null;hidePages();$('game').hidden=false;$('winOv').hidden=$('overOv').hidden=true;$('overSub').hidden=true;resize();
 setLevel(s.initial,s.maxLives,s.cur,s.lives,{hints:s.hints,undos:s.undos,stack:s.stack});if(lives<=0)over()}
function restart(){if(!initial||loading||run)return;clearInterval(entryTimer);dotT.clear();lvl={w:initial.w,h:initial.h,snakes:initial.snakes.slice(),walls:initial.walls||null};total=lvl.snakes.length;won=false;lives=maxLives;usedHints=0;combo=0;undosLeft=UNDOS;undoStack=[];prevLives=null;flashId=null;removal=new Map();bumps.clear();freedC.clear();resetView();$('overOv').hidden=$('winOv').hidden=true;hud();startEntry();persist()}
function flash(id){flashId=id;flashStart=performance.now();clearTimeout(flashT);setTimeout(()=>{if(flashId===id)flashId=null},K.FLASH_MS)}
function hint(){if(P.items.hints<=0||loading||won||lives<=0||entering||$('game').hidden)return;resetView();const id=findRemovable(lvl);if(id==null)return;flash(id);P.items.hints--;usedHints++;P.stats.hints++;save();hud();persist()}
function fadeIn(id){entry.set(id,0);let el=0;const h=setInterval(()=>{el+=K.FRAME;const l=Math.min(1,el/260);entry.set(id,1-Math.pow(1-l,3));if(l>=1){clearInterval(h);entry.delete(id)}},K.FRAME)}
function undo(){if(undosLeft<=0||!undoStack.length||loading||won||lives<=0||entering||removal.size||$('game').hidden)return;const s=undoStack.pop();s.body.forEach(p=>dotT.delete(p.y*lvl.w+p.x));lvl={...lvl,snakes:[...lvl.snakes,s]};undosLeft--;P.stats.undos++;save();flashId=null;fadeIn(s.id);hud();persist()}
// ---- timed / endless runs
function startRun(type){run={type,score:0,time:TA_START,lives:3,over:false};startTimer();nextBoard()}
function nextBoard(){newLevel({mode:run.type,lv:run.type==='ta'?2+(run.score>>1):1+run.score})}
function startTimer(){clearInterval(runTimer);if(run.type!=='ta')return;runLast=performance.now();
 runTimer=setInterval(()=>{const n=performance.now(),d=(n-runLast)/1000;runLast=n;if(!run||run.over||loading||!$('winOv').hidden||$('game').hidden)return;run.time-=d;if(run.time<=0){run.time=0;lives=0;hud();endRun()}else hud()},250)}
function stopRun(){clearInterval(runTimer);runTimer=null;run=null}
function endRun(){if(!run||run.over)return;run.over=true;clearInterval(runTimer);lives=0;const key=run.type==='ta'?'taBest':'endBest',rec=run.score>P.stats[key];if(rec)P.stats[key]=run.score;
 touchStreak();const un=checkAch();save();hud();$('overMsg').textContent=tt(run.type==='ta'?'run_ta':'run_end');$('overSub').textContent=tt('run_score',{n:nf(run.score),b:nf(P.stats[key])})+(rec&&run.score>0?' · '+tt('run_new'):'');$('overSub').hidden=false;$('retryBtn').textContent=tt('again');$('overOv').hidden=false;un.forEach(i=>toast(tt('ach_unlocked',{n:tt('ach_'+i)}),2600))}
function boardDone(){run.score++;P.xp=(P.xp||0)+5;touchStreak();if(!(custom&&custom.sm)&&curShape&&SHAPES.includes(curShape))P.shapes[curShape]=1;
 if(run.type==='ta'){run.time+=TA_BONUS;toast(tt('time_plus',{n:nf(TA_BONUS)}),900)}else if(run.score%3===0&&run.lives<3)run.lives++;
 save();hud();setTimeout(()=>{if(run&&!run.over)nextBoard()},500)}
function over(){if(run){endRun();return}$('overMsg').textContent=tt('lost');$('overSub').hidden=true;$('refillBtn').hidden=P.items.refills<=0;$('refillBtn').textContent='❤ '+tt('refill',{n:nf(P.items.refills)});$('retryBtn').textContent=tt('retry');$('overOv').hidden=false}
function animateRemoval(id){const dur=K.REM[P.speed]||600,sn=lvl.snakes.find(s=>s.id===id),n=sn?sn.body.length:0,anim=!!sn&&!reduced();let fi=n-1,hd=false;removal.set(id,0);let el=0;
 const h=setInterval(()=>{el+=K.FRAME;const lp=Math.min(1,el/dur),r=lp*lp*lp;removal.set(id,r);
  if(anim){const tp=(n-1)*(1-r),now=performance.now(),free=i=>{const ci=sn.body[i].y*lvl.w+sn.body[i].x;if(!freedC.has(ci)){freedC.add(ci);dotT.set(ci,now)}};
   while(fi>=1&&fi>tp+.25){free(fi);fi--}if(!hd&&r>.12){hd=true;free(0)}}
  if(el>=dur){clearInterval(h);removal.set(id,1);removed(id);removal.delete(id)}},K.FRAME)}
function removed(id){const sn=lvl.snakes.find(s=>s.id===id);if(sn){undoStack.push(sn);P.stats.arrows=(P.stats.arrows||0)+1;const now=performance.now();sn.body.forEach(p=>{const ci=p.y*lvl.w+p.x;freedC.delete(ci);if(!reduced()&&!dotT.has(ci))dotT.set(ci,now)})}lvl={...lvl,snakes:lvl.snakes.filter(s=>s.id!==id)};hud();
 if(!lvl.snakes.length){won=true;clearSave();if(run)boardDone();else{onWin();startWin(sn);setTimeout(showWin,reduced()?200:1100)}}
 else persist()}
function toGrid(x,y){const cx=W/2,cy=H/2,tx=(x-ox-cx)/sc+cx,ty=(y-oy-cy)/sc+cy,cs=Math.min(W/lvl.w,H/lvl.h,MAXCS);
 return[(tx-(W-cs*lvl.w)/2)/cs,(ty-(H-cs*lvl.h)/2)/cs]}
// distance (in cells) the head can travel before its tip actually touches the first obstacle ahead.
// Obstacle snakes are approximated by the same stroked path + arrow outline the renderer draws (cell units).
function snakePts(q,out){const b=q.body,n=b.length,d=q.dir,R=K.CORNER,ah=K.ARROW,c=v=>v+.5,S=Math.sign,rs=K.STROKE/2+.03;
 const seg=(x0,y0,x1,y1,r)=>{const L=Math.hypot(x1-x0,y1-y0),m=Math.max(1,Math.ceil(L/.04));for(let i=0;i<=m;i++)out.push([x0+(x1-x0)*i/m,y0+(y1-y0)*i/m,r])};
 const quad=(x0,y0,cx,cy,x1,y1)=>{for(let i=0;i<=8;i++){const t=i/8,u=1-t;out.push([u*u*x0+2*u*t*cx+t*t*x1,u*u*y0+2*u*t*cy+t*t*y1,rs])}};
 const hx=c(b[0].x),hy=c(b[0].y);let cx,cy;
 if(n===1){seg(hx-d.dx*K.TAIL1,hy-d.dy*K.TAIL1,hx+d.dx*R,hy+d.dy*R,rs)}
 else{cx=c(b[n-1].x);cy=c(b[n-1].y);
  for(let i=n-2;i>=1;i--){const pv=b[i+1],cu=b[i],nx=b[i-1],X=c(cu.x),Y=c(cu.y),x1=X+S(pv.x-cu.x)*R,y1=Y+S(pv.y-cu.y)*R;seg(cx,cy,x1,y1,rs);cx=X+S(nx.x-cu.x)*R;cy=Y+S(nx.y-cu.y)*R;quad(x1,y1,X,Y,cx,cy)}
  const x1=hx+S(b[1].x-b[0].x)*R,y1=hy+S(b[1].y-b[0].y)*R;seg(cx,cy,x1,y1,rs);quad(x1,y1,hx,hy,hx+d.dx*R,hy+d.dy*R)}
 const tx=hx+d.dx*(R+ah*.5),ty=hy+d.dy*(R+ah*.5),a=d.a*Math.PI/180,v=[0,2.094,-2.094].map(o=>[tx+ah*Math.cos(a+o),ty+ah*Math.sin(a+o)]);
 for(let i=0;i<3;i++){const p=v[i],q2=v[(i+1)%3];seg(p[0],p[1],q2[0],q2[1],K.ARROWSTROKE*ah/2+.03)}}
function bumpDist(s){const h=s.body[0],d=s.dir,hx=h.x+.5,hy=h.y+.5,hz=d.dx!==0,pts=[];
 lvl.snakes.forEach(q=>{if(q===s||removal.has(q.id))return;
  if(q.body.some(p=>hz?(Math.abs(p.y-h.y)<=1&&(p.x-h.x)*d.dx>0):(Math.abs(p.x-h.x)<=1&&(p.y-h.y)*d.dy>0)))snakePts(q,pts)});
 const tip=K.CORNER+K.ARROW*1.5+K.ARROWSTROKE*K.ARROW/2;let best=Infinity;
 pts.forEach(([x,y,r])=>{const lat=hz?Math.abs(y-hy):Math.abs(x-hx);if(lat>=r)return;const along=hz?(x-hx)*d.dx:(y-hy)*d.dy;if(along<=0)return;const t=along-Math.sqrt(r*r-lat*lat)-tip;if(t<best)best=t});
 return isFinite(best)?Math.max(.1,best):0}
function startBump(s){const D=reduced()?0:bumpDist(s),h=s.body[0];
 bumps.set(s.id,{t0:performance.now(),D,hx:h.x,hy:h.y,dx:s.dir.dx,dy:s.dir.dy,tf:D?Math.min(360,120+24*D):1,th:D?50:130,tb:D?Math.min(520,190+22*D):1,tr:420})}
function bumpState(b,now){const t=now-b.t0,red=Math.min(1,t/70);
 if(t<b.tf){const u=t/b.tf;return{d:b.D*u*u,red}}
 if(t<b.tf+b.th)return{d:b.D,red:1,hit:t-b.tf};
 const t2=t-b.tf-b.th;if(t2<b.tb){const u=t2/b.tb;return{d:b.D*Math.pow(1-u,3),red:1}}
 const f=(t2-b.tb)/b.tr;return f<1?{d:0,red:1-f}:null}
function activate(s,ob){
 if(ob){if(bumps.has(s.id))return;combo=0;if(run&&run.type==='ta'){run.time=Math.max(0,run.time-TA_PEN);hud()}
  else if(lives>0){lives--;if(run)run.lives=lives;hud();persist();if(lives<=0)setTimeout(over,700)}startBump(s)}
 else if(!removal.has(s.id)){combo++;if(combo>(P.stats.bestCombo||0))P.stats.bestCombo=combo;animateRemoval(s.id)}}
function bodyDist(s,gx,gy){const b=s.body;if(b.length===1)return Math.hypot(b[0].x+.5-gx,b[0].y+.5-gy);let m=1e9;
 for(let i=0;i<b.length-1;i++){const ax=b[i].x+.5,ay=b[i].y+.5,dx=b[i+1].x-b[i].x,dy=b[i+1].y-b[i].y,t=Math.max(0,Math.min(1,((gx-ax)*dx+(gy-ay)*dy)/(dx*dx+dy*dy))),px=ax+t*dx-gx,py=ay+t*dy-gy;m=Math.min(m,px*px+py*py)}return Math.sqrt(m)}
function onTap(x,y){
 if(loading||lives<=0||entering||won)return;
 const[gx,gy]=toGrid(x,y),los=new LineOfSight(lvl,new Set(removal.keys())),cs=Math.min(W/lvl.w,H/lvl.h,MAXCS),tb=Math.min(1.1,Math.max(.55,16/(cs*sc)));
 // any point of a snake (head, tip or body) counts as a tap on that snake
 const cand=lvl.snakes.map(s=>{const h=s.body[0],hd=Math.hypot(h.x+.5+s.dir.dx*K.TAPOFF-gx,h.y+.5+s.dir.dy*K.TAPOFF-gy),bd=bodyDist(s,gx,gy);return[s,Math.min(hd<=K.TOL?hd:1e9,bd<=tb?bd:1e9)]})
  .filter(c=>c[1]<1e9).map(c=>[c[0],c[1],los.blocked(c[0])]).sort((a,b)=>(a[1]+(a[2]?.35:0))-(b[1]+(b[2]?.35:0)))[0];
 if(cand)activate(cand[0],cand[2])}
function kbdMove(d){if(!lvl||!lvl.snakes.length||loading||entering)return;const o=lvl.snakes.slice().sort((a,b)=>a.body[0].y-b.body[0].y||a.body[0].x-b.body[0].x);let i=o.findIndex(s=>s.id===kSel);i=i<0?(d>0?0:o.length-1):(i+d+o.length)%o.length;kSel=o[i].id;kbdMode=true}
function drawKbd(cs,col){if(!kbdMode||kSel==null)return;const s=lvl.snakes.find(q=>q.id===kSel);if(!s){kSel=null;return}const h=s.body[0],px=(h.x+.5+s.dir.dx*K.TAPOFF)*cs,py=(h.y+.5+s.dir.dy*K.TAPOFF)*cs;
 ctx.save();ctx.globalAlpha=1;ctx.strokeStyle=col.acc;ctx.lineWidth=Math.max(2,cs*.1);ctx.setLineDash([cs*.18,cs*.12]);ctx.beginPath();ctx.arc(px,py,cs*.62,0,6.2832);ctx.stroke();ctx.restore()}
const GOLD='#FFD76A',reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
function startWin(sn){if(reduced()){win=null;return}const h={x:lvl.w/2-.5,y:lvl.h/2-.5},R=Math.max(lvl.w,lvl.h),arrows=[];
 for(let w=0;w<3;w++){const n=w===1?16:12;for(let i=0;i<n;i++)arrows.push({a:i/n*Math.PI*2+w*Math.PI/n+(Math.random()-.5)*.08,delay:w*.16+(i%3)*.025,dist:R*(.5+.18*w+Math.random()*.12),len:1.5+w*.4,c:(i+w)%3})}
 win={t0:performance.now(),x:h.x+.5,y:h.y+.5,arrows}}
function drawWin(now,cs,col){if(!win)return;const GOLD=col.gold;const t=(now-win.t0)/1000;if(t>2.5){win=null;return}
 const ease=u=>1-Math.pow(1-Math.min(1,Math.max(0,u)),3),maxD=Math.hypot(Math.max(win.x,lvl.w-win.x),Math.max(win.y,lvl.h-win.y))+3,f1=ease(t/1.3)*maxD,fade=Math.min(1,Math.max(0,1-(t-1.4)/1.0));
 if(cs*sc>7){const a=occ(),w=lvl.w,h=lvl.h,wl=lvl.walls,r=cs*.12;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){if(a[y*w+x]||(wl&&wl[x][y]))continue;const d=Math.hypot(x+.5-win.x,y+.5-win.y);
   let m=Math.exp(-((d-f1)*(d-f1))/(2*1.4*1.4));if(d<f1)m=Math.max(m,.4*Math.exp(-(f1-d)/3));m*=fade;if(m<.03)continue;
   ctx.fillStyle=mixc(col.bg,m>.65?GOLD:col.acc,Math.min(1,.2+m));ctx.beginPath();ctx.arc((x+.5)*cs,(y+.5)*cs,r*(1+1.6*m),0,6.2832);ctx.fill()}}
 ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
 if(f1>.2){ctx.globalAlpha=.5*fade;ctx.strokeStyle=GOLD;ctx.lineWidth=Math.max(1.5,cs*.08);ctx.beginPath();ctx.arc(win.x*cs,win.y*cs,f1*cs,0,6.2832);ctx.stroke()}
 const cols=[GOLD,col.acc,col.snake],lw=Math.max(2/sc,cs*.17),hs=Math.max(4/sc,cs*.34);
 win.arrows.forEach(ar=>{const u=(t-ar.delay)/1.05;if(u<=0||u>=1)return;const e=ease(u),dx=Math.cos(ar.a),dy=Math.sin(ar.a),px=(win.x+dx*ar.dist*e)*cs,py=(win.y+dy*ar.dist*e)*cs,L=ar.len*cs*(1-.45*u),al=u<.65?1:(1-u)/.35,c=cols[ar.c];
  ctx.strokeStyle=c;ctx.fillStyle=c;ctx.shadowColor=ar.c===0?GOLD:'transparent';ctx.shadowBlur=ar.c===0?cs*.6:0;
  ctx.globalAlpha=.3*al;ctx.lineWidth=lw*.7;ctx.beginPath();ctx.moveTo(px-dx*L*2.2,py-dy*L*2.2);ctx.lineTo(px-dx*hs,py-dy*hs);ctx.stroke();
  ctx.globalAlpha=al;ctx.lineWidth=lw;ctx.beginPath();ctx.moveTo(px-dx*L,py-dy*L);ctx.lineTo(px-dx*hs,py-dy*hs);ctx.stroke();
  ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px-dx*hs*1.5+dy*hs*.85,py-dy*hs*1.5-dx*hs*.85);ctx.lineTo(px-dx*hs*1.5-dy*hs*.85,py-dy*hs*1.5+dx*hs*.85);ctx.closePath();ctx.fill()});
 ctx.restore()}
function showWin(){$('winOv').hidden=false;const w=winInfo;if(!w||!w.xp||reduced())return;const el=$('winXp'),t0=performance.now()+900,dur=650;
 const tick=n=>{const u=Math.min(1,Math.max(0,(n-t0)/dur));el.textContent=tt('xp_gain',{n:nf(Math.round(w.xp*u))})+w.promo;if(u<1&&!$('winOv').hidden)requestAnimationFrame(tick)};requestAnimationFrame(tick)}
// ---- rendering ----
const sg=Math.sign;
let occC={l:null,g:null};
function occ(){if(occC.l!==lvl){const a=new Uint8Array(lvl.w*lvl.h);lvl.snakes.forEach(s=>s.body.forEach(p=>a[p.y*lvl.w+p.x]=1));occC={l:lvl,g:a}}return occC.g}
const POP_MS=440,POP_PEAK=2.1;
function drawDots(cs,col,now){const a=occ(),w=lvl.w,h=lvl.h,wl=lvl.walls,r=cs*.12,e=v=>v*v*(3-2*v),pops=[];ctx.globalAlpha=1;ctx.fillStyle=col.dot;ctx.beginPath();
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x;if((a[i]&&!freedC.has(i))||(wl&&wl[x][y]))continue;const t0=dotT.get(i);let k=1;
  if(t0!==undefined){const u=(now-t0)/POP_MS;if(u<0)continue;if(u>=1)dotT.delete(i);else{k=u<.4?e(u/.4)*POP_PEAK:POP_PEAK-(POP_PEAK-1)*e((u-.4)/.6);if(k>1.02)pops.push([x,y,k])}}
  const cx=(x+.5)*cs,cy=(y+.5)*cs;ctx.moveTo(cx+r*k,cy);ctx.arc(cx,cy,r*k,0,6.2832)}ctx.fill();
 if(pops.length){ctx.fillStyle=col.acc;pops.forEach(([x,y,k])=>{ctx.globalAlpha=Math.min(.85,(k-1)/(POP_PEAK-1)*.85);ctx.beginPath();ctx.arc((x+.5)*cs,(y+.5)*cs,r*k,0,6.2832);ctx.fill()});ctx.globalAlpha=1}}
function draw(now){requestAnimationFrame(draw);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
 if(guideT){const k=Math.min(1,(now-guideT)/K.GUIDE_MS);guideA=guideFrom+(guideTo-guideFrom)*k;if(k>=1)guideT=0}
 if(lvl&&!loading){const col=theme(),cs=Math.min(W/lvl.w,H/lvl.h,MAXCS),bw=cs*lvl.w,bh=cs*lvl.h,L=(W-bw)/2,T=(H-bh)/2;
  const m={cs,sw:cs*K.STROKE*(P.hc?1.35:1),R:cs*K.CORNER,ah:cs*K.ARROW,move:Math.max(W,H)*K.MOVE};
  ctx.save();ctx.translate(W/2+ox,H/2+oy);const bump=win?1+.028*Math.sin(Math.min(1,(now-win.t0)/450)*Math.PI):1;ctx.scale(sc*bump,sc*bump);ctx.translate(-W/2,-H/2);ctx.translate(L,T);
  if(!entering&&cs*sc>7)drawDots(cs,col,now);
  drawWin(now,cs,col);
  if(guideA>0)lvl.snakes.forEach(s=>{if(removal.has(s.id)||entry.has(s.id))return;const h=s.body[0],hx=(h.x+.5)*cs,hy=(h.y+.5)*cs;
   const ex=s.dir.dx>0?W-L:s.dir.dx<0?-L:hx,ey=s.dir.dy>0?H-T:s.dir.dy<0?-T:hy;
   ctx.globalAlpha=K.GUIDE_A*guideA;ctx.strokeStyle=col.acc;ctx.lineWidth=2;ctx.lineCap='round';ctx.setLineDash([10,10]);
   ctx.beginPath();ctx.moveTo(hx,hy);ctx.lineTo(hx+(ex-hx)*guideA,hy+(ey-hy)*guideA);ctx.stroke();ctx.setLineDash([])});
  const pulse=flashId!=null?(()=>{const t=(now-flashStart)%(K.PULSE*2),tr=t<K.PULSE?t/K.PULSE:(K.PULSE*2-t)/K.PULSE;return 1-(1-K.PULSE_MIN)*tr})():1;
  const bs=new Map();bumps.forEach((b,id)=>{const st=bumpState(b,now);if(st)bs.set(id,st);else bumps.delete(id)});
  lvl.snakes.forEach(s=>drawSnake(s,m,col,pulse,bs.get(s.id)));
  bs.forEach((st,id)=>{if(st.hit==null||st.hit>340)return;const b=bumps.get(id),u=st.hit/340;ctx.save();ctx.globalAlpha=.75*(1-u);ctx.strokeStyle=col.bad;ctx.lineWidth=Math.max(1.5,cs*.07);
   ctx.beginPath();ctx.arc((b.hx+.5+b.dx*(b.D+.68))*cs,(b.hy+.5+b.dy*(b.D+.68))*cs,cs*(.12+.6*u),0,6.2832);ctx.stroke();ctx.restore()});
  drawKbd(cs,col);ctx.restore()}
 ctx.globalAlpha=1}
const rgb=h=>[1,3,5].map(i=>parseInt(h.substr(i,2),16));
function mixc(bg,fg,t){const a=rgb(bg),b=rgb(fg);return`rgb(${a.map((v,i)=>Math.round(v+(b[i]-v)*t)).join()})`}
const lerph=(a,b,t)=>{const x=rgb(a),y=rgb(b);return'#'+x.map((v,i)=>Math.round(v+(y[i]-v)*t).toString(16).padStart(2,'0')).join('')};
function drawSnake(s,m,col,pulse,bp){
 const ep=entry.get(s.id);let p,shift,al;
 if(ep!=null){p=1-Math.min(1,Math.max(0,ep));shift=0;al=Math.min(ep*2.5,1)}else{const r=Math.min(1,Math.max(0,removal.get(s.id)||0));p=r;shift=m.move*r;al=1-r}
 let ext=0;if(bp&&ep==null&&!removal.has(s.id)){const nn=s.body.length;shift=bp.d*m.cs;p=nn>1?Math.min(1,bp.d/(nn-1)):0;ext=nn>1?Math.max(0,bp.d-(nn-1)):0}
 const fl=s.id===flashId,ex=!fl&&ep==null&&removal.has(s.id);ctx.globalAlpha=1;const base=bp&&ep==null?lerph(col.snake,col.bad,bp.red):col.snake,colr=mixc(col.bg,fl?col.bad:ex?(P.cb?'#2EC4D6':'#FF9F43'):base,Math.min(1,Math.max(0,fl?al*pulse:al)));
 const b=s.body,n=b.length,d=s.dir,cs=m.cs,R=m.R,c=q=>(q+.5)*cs;
 const hx0=c(b[0].x),hy0=c(b[0].y),bx0=hx0+d.dx*R,by0=hy0+d.dy*R,lx=hx0+d.dx*shift+d.dx*R,ly=hy0+d.dy*shift+d.dy*R;
 ctx.strokeStyle=ctx.fillStyle=colr;ctx.lineWidth=m.sw;ctx.lineCap=ctx.lineJoin='round';
 if(n>1&&ext>0){ctx.beginPath();ctx.moveTo(hx0+d.dx*ext*cs,hy0+d.dy*ext*cs);ctx.lineTo(lx,ly);ctx.stroke()}
 else if(n>1){const tp=(n-1)*(1-p),tf=Math.min(n-1,Math.max(0,Math.floor(tp))),fr=tp-tf;ctx.beginPath();
  if(fr<.001||tf>=n-1)ctx.moveTo(c(b[tf].x),c(b[tf].y));else ctx.moveTo(c(b[tf].x)+(c(b[tf+1].x)-c(b[tf].x))*fr,c(b[tf].y)+(c(b[tf+1].y)-c(b[tf].y))*fr);
  const ls=fr>.001&&tf>=1&&tf<n-1?tf:tf-1;
  for(let i=ls;i>=1;i--){const pv=b[i+1],cu=b[i],nx=b[i-1],X=c(cu.x),Y=c(cu.y);
   ctx.lineTo(X+sg(pv.x-cu.x)*R,Y+sg(pv.y-cu.y)*R);ctx.quadraticCurveTo(X,Y,X+sg(nx.x-cu.x)*R,Y+sg(nx.y-cu.y)*R)}
  ctx.lineTo(hx0+sg(b[1].x-b[0].x)*R,hy0+sg(b[1].y-b[0].y)*R);ctx.quadraticCurveTo(hx0,hy0,bx0,by0);
  if(lx!==bx0||ly!==by0)ctx.lineTo(lx,ly);ctx.stroke()}
 else{const tl=cs*K.TAIL1;ctx.beginPath();ctx.moveTo(lx-d.dx*(tl+R),ly-d.dy*(tl+R));ctx.lineTo(lx,ly);ctx.stroke()}
 if(ep==null){const cx=lx+d.dx*m.ah*.5,cy=ly+d.dy*m.ah*.5,a=d.a*Math.PI/180,r=m.ah;ctx.beginPath();
  ctx.moveTo(cx+r*Math.cos(a),cy+r*Math.sin(a));ctx.lineTo(cx+r*Math.cos(a+2.094),cy+r*Math.sin(a+2.094));ctx.lineTo(cx+r*Math.cos(a-2.094),cy+r*Math.sin(a-2.094));ctx.closePath();
  ctx.fill();ctx.lineWidth=r*K.ARROWSTROKE;ctx.stroke()}}
// ---- input: tap / pan / pinch ----
const ptr=new Map();let moved=false,downAt=null;
cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);ptr.set(e.pointerId,{x:e.offsetX,y:e.offsetY});if(ptr.size===1){moved=false;downAt={x:e.offsetX,y:e.offsetY}}else moved=true});
cv.addEventListener('pointermove',e=>{const o=ptr.get(e.pointerId);if(!o)return;const n={x:e.offsetX,y:e.offsetY};
 if(ptr.size===1){if(!moved&&Math.hypot(n.x-downAt.x,n.y-downAt.y)<8)return;moved=true;ox+=n.x-o.x;oy+=n.y-o.y}
 else if(ptr.size===2){const[a,b]=[...ptr.entries()].map(([id,v])=>id===e.pointerId?n:v),[a0,b0]=[...ptr.entries()].map(([,v])=>v);
  const d0=Math.hypot(a0.x-b0.x,a0.y-b0.y),d1=Math.hypot(a.x-b.x,a.y-b.y);
  if(d0>0)sc=Math.min(K.MAXS,Math.max(K.MINS,sc*d1/d0));ox+=(a.x+b.x-a0.x-b0.x)/2;oy+=(a.y+b.y-a0.y-b0.y)/2}
 ptr.set(e.pointerId,n)});
const up=e=>{if(ptr.has(e.pointerId)){const wasTap=!moved&&ptr.size===1&&e.type==='pointerup';ptr.delete(e.pointerId);if(wasTap)onTap(e.offsetX,e.offsetY)}};
cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
cv.addEventListener('wheel',e=>{e.preventDefault();sc=Math.min(K.MAXS,Math.max(K.MINS,sc*(e.deltaY<0?1.1:1/1.1)))},{passive:false});
// ================= i18n, pages and meta-game features =================
const nf=n=>P.lang==='fa'?Number(n).toLocaleString('fa-IR',{useGrouping:false}):String(n);
const tt=(k,v)=>{let s=(I18N[P.lang]&&I18N[P.lang][k])||I18N.en[k]||k;if(v)for(const x in v)s=s.replace('{'+x+'}',v[x]);return s};
const loc=()=>P.lang==='fa'?'fa-IR':'en-US';
const noon=(d=new Date())=>new Date(d.getFullYear(),d.getMonth(),d.getDate(),12);
const dayKey=(d=new Date())=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const fromKey=k=>{const [y,m,d]=k.split('-').map(Number);return new Date(y,m-1,d,12)};
const yest=()=>{const d=new Date();d.setDate(d.getDate()-1);return dayKey(d)};
if(!P.installed){P.installed=dayKey();save()}
const CAL=()=>P.lang==='fa'?'persian':'gregory';
const calLoc=()=>loc()+'-u-ca-'+CAL();
const cparts=d=>{const o={};new Intl.DateTimeFormat('en-US-u-ca-'+CAL()+'-nu-latn',{year:'numeric',month:'numeric',day:'numeric'}).formatToParts(d).forEach(p=>{if(p.type==='month'||p.type==='day')o[p.type]=parseInt(p.value,10)});return o};
function monthStart(d){const x=noon(d);while(cparts(x).day>1)x.setDate(x.getDate()-1);return x}
function monthDays(s){const m=cparts(s).month,out=[],x=new Date(s);while(cparts(x).month===m){out.push(new Date(x));x.setDate(x.getDate()+1)}return out}
function addMonth(s,n){const x=new Date(s);x.setDate(x.getDate()+(n>0?32:-1));return monthStart(x)}
let chView=null,chSel=null;
const dstreakNow=()=>(P.dstreak.last===dayKey()||P.dstreak.last===yest())?(P.dstreak.n||0):0;
const streakNow=()=>(P.lastDay===dayKey()||P.lastDay===yest())?(P.streak||0):0;
function touchStreak(){const k=dayKey();if(P.lastDay===k)return;P.streak=P.lastDay===yest()?(P.streak||0)+1:1;P.lastDay=k;P.stats.bestStreak=Math.max(P.stats.bestStreak||0,P.streak)}
const TIERS=[{id:'bronze',xp:0},{id:'silver',xp:200},{id:'gold',xp:600},{id:'platinum',xp:1400},{id:'diamond',xp:3000},{id:'emerald',xp:4500},{id:'ruby',xp:6500},{id:'sapphire',xp:9000},{id:'master',xp:12500},{id:'grandmaster',xp:17000},{id:'champion',xp:23000},{id:'legend',xp:32000}];
function tierOf(xp){let i=0;TIERS.forEach((x,k)=>{if(xp>=x.xp)i=k});return{...TIERS[i],i,next:TIERS[i+1]||null}}
const IC={home:'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',cal:'M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM7 12h5v5H7z',
 stars:'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',gen:'M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm13 0h2v3h3v2h-3v3h-2v-3h-3v-2h3z',
 gear:'M19.14 12.94a7.07 7.07 0 000-1.88l2.03-1.58-1.92-3.32-2.39.96a7 7 0 00-1.62-.94L14.9 3h-3.84l-.36 2.55c-.58.23-1.12.54-1.62.94l-2.39-.96-1.92 3.32 2.03 1.58a7.07 7.07 0 000 1.88l-2.03 1.58 1.92 3.32 2.39-.96c.5.4 1.04.71 1.62.94l.36 2.55h3.84l.36-2.55c.58-.23 1.12-.54 1.62-.94l2.39.96 1.92-3.32zM13 15.5A3.5 3.5 0 1113 8.5a3.5 3.5 0 010 7z',
 flame:'M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z',
 back:'M16 5v14L6 12z',restart:'M17.65 6.35A7.96 7.96 0 0012 4a8 8 0 108 8h-2a6 6 0 11-1.76-4.24L13 11h7V4z',
 shuffle:'M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z',
 bulb:'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z',
 fit:'M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4z',
 hash:'M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z',check:'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z',
 lock:'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z'};
const ic=d=>`<svg class="ic" viewBox="0 0 24 24"><path d="${d}"/></svg>`;
const shield=(id,lk)=>`<svg viewBox="0 0 24 24"${lk?' style="filter:grayscale(1);opacity:.4"':''}><path d="M12 2.2l8 3v6.1c0 5-3.3 9.2-8 10.6-4.7-1.4-8-5.6-8-10.6V5.2z" fill="url(#sh-${id})"/><path d="M12 4.4l5.8 2.2v4.7c0 3.7-2.3 6.8-5.8 8-3.5-1.2-5.8-4.3-5.8-8V6.6z" fill="#fff" fill-opacity=".2"/></svg>`;
const cup=on=>`<svg viewBox="0 0 24 24" style="color:${on?'var(--gold)':'var(--btnfg)'};opacity:${on?1:.45}"><path fill="currentColor" d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>`;
IC.fwd='M8 5v14l10-7z';IC.user='M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z';IC.images='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z';IC.trophy='M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z';IC.playi='M8 5v14l11-7z';
Object.assign(IC,{dots:'M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z',undo:'M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z',timer:'M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z',inf:'M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z'});
const starSvg=on=>`<svg viewBox="0 0 24 24" class="st${on?' on':''}"><path d="${IC.stars}"/></svg>`;
const starsHtml=n=>[1,2,3].map(i=>starSvg(i<=n)).join('');
document.querySelectorAll('[data-ic]').forEach(e=>e.outerHTML=ic(IC[e.dataset.ic]));
// ---- toast, achievements, share
let toastT=0;function toast(m,ms=1800){const e=$('toast');e.textContent=m;e.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>e.hidden=true,ms)}
const ACH=[['first',s=>s.cleared>=1],['ten',s=>s.cleared>=10],['fifty',s=>s.cleared>=50],['flawless',s=>s.perfect>=1],['perfect10',s=>s.perfect>=10],['pure',s=>s.pure>=1],['close',s=>s.close>=1],['streak3',s=>s.bestStreak>=3],['streak7',s=>s.bestStreak>=7],['streak30',s=>s.bestStreak>=30],
 ['daily10',()=>Object.keys(P.daily).length>=10],['month',s=>s.months>=1],['shapes5',()=>Object.keys(P.shapes).length>=5],['shapes25',()=>Object.keys(P.shapes).length>=25],['shapes19',()=>Object.keys(P.shapes).length>=50],['gold',()=>(P.xp||0)>=600],['diamond',()=>(P.xp||0)>=3000],['big',s=>s.big>=1],['ta10',s=>s.taBest>=10],['end15',s=>s.endBest>=15],
 ['hundred',s=>s.cleared>=100],
 ['two50',s=>s.cleared>=250],
 ['five100',s=>s.cleared>=500],
 ['thousand',s=>s.cleared>=1000],
 ['perfect25',s=>s.perfect>=25],
 ['perfect50',s=>s.perfect>=50],
 ['flaw50',s=>s.flawless>=50],
 ['flaw200',s=>s.flawless>=200],
 ['combo10',s=>s.bestCombo>=10],
 ['combo25',s=>s.bestCombo>=25],
 ['combo50',s=>s.bestCombo>=50],
 ['combo100',s=>s.bestCombo>=100],
 ['arrows100',s=>s.arrows>=100],
 ['arrows1k',s=>s.arrows>=1000],
 ['arrows10k',s=>s.arrows>=10000],
 ['streak14',s=>s.bestStreak>=14],
 ['streak60',s=>s.bestStreak>=60],
 ['streak100',s=>s.bestStreak>=100],
 ['daily25',s=>Object.keys(P.daily).length>=25],
 ['daily50',s=>Object.keys(P.daily).length>=50],
 ['daily100',s=>Object.keys(P.daily).length>=100],
 ['dstreak3',s=>(P.dstreak.best||0)>=3],
 ['dstreak7',s=>(P.dstreak.best||0)>=7],
 ['dstreak30',s=>(P.dstreak.best||0)>=30],
 ['shapes100',s=>Object.keys(P.shapes).length>=100],
 ['shapes250',s=>Object.keys(P.shapes).length>=250],
 ['shapes500',s=>Object.keys(P.shapes).length>=SHAPES.length],
 ['lvl25',s=>P.level>=25],
 ['lvl100',s=>P.level>=100],
 ['lvl250',s=>P.level>=250],
 ['lvl500',s=>P.level>=500],
 ['stars100',s=>Object.values(P.stars).reduce((a,b)=>a+b,0)>=100],
 ['stars300',s=>Object.values(P.stars).reduce((a,b)=>a+b,0)>=300],
 ['platinum',s=>(P.xp||0)>=1400],
 ['emerald',s=>(P.xp||0)>=4500],
 ['master',s=>(P.xp||0)>=12500],
 ['legend',s=>(P.xp||0)>=32000],
 ['ta20',s=>s.taBest>=20],
 ['ta40',s=>s.taBest>=40],
 ['end30',s=>s.endBest>=30],
 ['end60',s=>s.endBest>=60],
 ['pure10',s=>s.pure>=10],
 ['close5',s=>s.close>=5],
 ['big10',s=>s.big>=10],
 ['hints25',s=>s.hints>=25],
 ['sm5',s=>Object.values(P.sm).filter(v=>v>=SM_BOARDS).length>=5]];
function checkAch(){const out=[];ACH.forEach(([id,f])=>{if(!P.ach[id]&&f(P.stats)){P.ach[id]=Date.now();out.push(id)}});return out}
// ---- win bookkeeping
function onWin(){const before=tierOf(P.xp||0),lost=maxLives-lives,stars=lost<=0?3:lost===1?2:1,S=P.stats,camp=!custom||!!custom.replay,n=custom&&custom.replay?custom.replay:P.level;let xp=0;const rw=[];
 S.cleared++;if(lives===maxLives)S.flawless=(S.flawless||0)+1;if(S.cleared%3===0){P.items.hints++;rw.push('💡 '+tt('reward_hint'))}if(S.cleared%10===0){P.items.refills++;rw.push('❤ '+tt('reward_refill'))}if(camp&&stars===3&&(P.stars[n]||0)<3)S.perfect++;if(usedHints===0&&UNDOS-undosLeft===0)S.pure++;if(lives===1&&maxLives>=3)S.close++;if(custom&&custom.w&&(custom.w>=50||custom.h>=50))S.big++;
 if(camp)P.stars[n]=Math.max(P.stars[n]||0,stars);
 if(custom&&custom.daily){if(custom.day===dayKey()&&lives===maxLives&&P.dstreak.last!==custom.day){const ds=P.dstreak;ds.n=ds.last===yest()?ds.n+1:1;ds.last=custom.day;ds.best=Math.max(ds.best||0,ds.n);rw.push('🔥 '+tt('ch_streak_up',{n:nf(ds.n)}))}
  if(!P.daily[custom.day]){P.daily[custom.day]=1;xp=25;P.items.hints++;rw.push('💡 '+tt('reward_hint'));const ms=monthStart(fromKey(custom.day));if(monthDays(ms).every(d=>P.daily[dayKey(d)]))S.months++}}
 else if(custom&&custom.sm){const k=custom.shape,i=custom.idx;xp=5;P.sm[k]=Math.max(P.sm[k]||0,i+1);if(i+1>=SM_BOARDS&&!P.shapes[k]){P.shapes[k]=1;xp+=20;P.items.hints++;rw.push('🖼 '+tt('shape_unlocked',{n:shapeName(k)}))}}
 else if(!custom){P.level++;xp=10}
 P.xp=(P.xp||0)+xp;touchStreak();if(!(custom&&custom.sm)&&curShape&&SHAPES.includes(curShape))P.shapes[curShape]=1;const un=checkAch();save();
 lastWin={kind:custom&&custom.daily?'daily':camp?'level':'custom',n,day:custom&&custom.day,stars,lives,maxLives};
 const after=tierOf(P.xp),el=$('winXp');const promo=after.i>before.i?(xp?'  ·  ':'')+tt('promoted',{t:tt('tier_'+after.id)}):'';winInfo={xp,promo};el.textContent=(xp?tt('xp_gain',{n:nf(xp)}):'')+promo;el.hidden=!el.textContent;
 $('winStars').innerHTML=starsHtml(stars);$('winAch').innerHTML=(un.length?`<div class="achh">${tt('ach_new')}</div>`+un.map(i=>`<div>★ ${tt('ach_'+i)}</div>`).join(''):'')+rw.map(x=>'<div>'+x+'</div>').join('');$('winTitle').textContent=custom&&custom.sm?tt('won_sm',{a:nf(custom.idx+1),b:nf(SM_BOARDS)}):custom&&custom.daily?tt('won_day'):camp?tt('won_n',{n:nf(n)}):tt('won');chDot()}
const chDot=()=>{$('chDot').hidden=!!P.daily[dayKey()]};
const unlockedMonths=()=>{const a=monthStart(fromKey(P.installed)),b=monthStart(noon());return[a,b]};
// ---- pages
const PAGES=['home','league','levels','challenge','collection','custom','settings'];let coView='shapes';let curPage='home';
function hidePages(){PAGES.forEach(x=>$(x).hidden=true);$('nav').hidden=true}
let bubX=null;
function moveBub(anim){const nav=$('nav'),on=nav.querySelector('button.on'),bub=$('navBub');if(!on||!nav.offsetWidth){bubX=null;return}
 const x=on.offsetLeft+on.offsetWidth/2-bub.offsetWidth/2,from=bubX;bubX=x;bub.style.transform=`translateX(${x}px)`;
 if(anim&&from!=null&&Math.abs(from-x)>1&&!reduced()&&bub.animate){const d=x-from;
  bub.animate([{transform:`translateX(${from}px) scale(1,1)`},{transform:`translateX(${from+d*.5}px) translateY(-18px) scale(1.12,.9)`,offset:.5},{transform:`translateX(${x}px) scale(1,1)`}],{duration:580,easing:'cubic-bezier(.3,1.2,.55,1)'})}}
// ---- sliding page transitions (same direction as the nav bubble)
function animRestart(e){e.classList.remove('anim');void e.offsetWidth;e.classList.add('anim')}
function chipsSet(el,list,cur){const sg=P.lang+list.map(x=>x[0]).join();if(el.dataset.sg!==sg){el.dataset.sg=sg;el.innerHTML=list.map(([k,l])=>`<button data-f="${k}">${tt(l)}</button>`).join('')}[...el.children].forEach(b=>b.classList.toggle('on',b.dataset.f===cur))}
// ---- segmented controls: one accent pill that glides between options
function segPlace(el,anim){let ind=el.querySelector(':scope>.segi');if(!ind){ind=document.createElement('i');ind.className='segi';el.prepend(ind);anim=false}
 const on=el.querySelector(':scope>button.on');if(!on||!el.offsetWidth){ind.style.opacity=0;return}
 const x=on.offsetLeft,first=ind.style.opacity!=='1';ind.style.opacity=1;ind.classList.toggle('nt',!anim||first);ind.style.width=on.offsetWidth+'px';ind.style.transform=`translateX(${x}px)`;if(!anim||first){void ind.offsetWidth;ind.classList.remove('nt')}}
const segAll=anim=>document.querySelectorAll('.seg').forEach(el=>segPlace(el,anim));
const segObs=new MutationObserver(ms=>{const m1=new Map();ms.forEach(m=>{if(m.target.classList&&m.target.classList.contains('segi'))return;const t=m.target.closest&&m.target.closest('.seg');if(t)m1.set(t,(m1.get(t)!==false)&&m.type==='attributes')});m1.forEach((a,el)=>segPlace(el,a&&!reduced()))});
let trans=null;
function endTrans(){if(!trans)return;trans.anims.forEach(a=>{try{a.cancel()}catch{}});trans.old.hidden=trans.old.id!==curPage;[trans.old,trans.nw].forEach(e=>e.classList.remove('slide'));trans=null}
function pageX(p){const m=(p==='league'||p==='levels')?'home':p,b=document.querySelector('#nav button[data-p="'+m+'"]');if(!b)return 0;const r=b.getBoundingClientRect();return r.left+r.width/2+(m!==p?(P.lang==='fa'?-8:8):0)}
function slidePages(old,nw,a,b){const d=Math.sign(pageX(b)-pageX(a))||1,o={duration:430,easing:'cubic-bezier(.22,1,.36,1)'};
 [old,nw].forEach(e=>e.classList.add('slide'));
 const x=old.animate([{transform:'translateX(0)'},{transform:`translateX(${-d*100}%)`}],o),y=nw.animate([{transform:`translateX(${d*100}%)`},{transform:'translateX(0)'}],o);
 trans={old,nw,anims:[x,y]};y.onfinish=()=>{if(trans&&trans.nw===nw)endTrans()}}
function show(p,keep){if(run)stopRun();const prev=curPage,fromGame=!$('game').hidden;endTrans();curPage=p;if(p==='challenge'&&!keep){chView=monthStart(noon());chSel=dayKey()}$('game').hidden=true;$('shSheet').hidden=true;
 const oldEl=$(prev),newEl=$(p),can=!fromGame&&prev!==p&&oldEl&&!oldEl.hidden&&!$('nav').hidden&&!reduced()&&!!newEl.animate;
 PAGES.forEach(x=>$(x).hidden=x!==p&&!(can&&x===prev));if(can)slidePages(oldEl,newEl,prev,p);$('nav').hidden=false;
 [...$('nav').children].forEach(b=>b.classList.toggle('on',b.dataset.p===(p==='league'||p==='levels'?'home':p)));requestAnimationFrame(()=>{moveBub(true);segAll(false)});theme();chDot();(RENDER[p]||(()=>{}))()}
let glF='all',glSel=null;const AVATARS=['🦉','🐱','🦊','🐼','🐸','🐯','🦄','🐙','🐳','🦋','🚀','👾'];
const playable=n=>!!P.shapes[n]||SHAPE_ORDER.indexOf(n)<SHAPES.filter(x=>P.shapes[x]).length+4;
function hideSheet(){const s=$('shSheet');if(s.hidden||s.classList.contains('out'))return;if(reduced()){s.hidden=true;return}s.classList.add('out');setTimeout(()=>{s.hidden=true;s.classList.remove('out')},190)}
let shTier=0;
function openSheet(n){glSel=n;shTier=(P.smd&&P.smd[n]!=null)?P.smd[n]:smTier(n);const got=!!P.shapes[n],pl=playable(n),i=SHAPE_ORDER.indexOf(n),d=Math.min(P.sm[n]||0,SM_BOARDS);
 $('shImg').innerHTML=got||pl?`<img src="assets/shapes/${n}.png" alt="">`:ic(IC.lock);$('shImg').classList.toggle('dim',!got&&!pl);
 $('shName').textContent=got?shapeName(n):'???';$('shMeta').textContent='#'+nf(i+1)+' · '+tt('sh_'+TIERK[smTier(n)]);$('shBar').style.width=(d/SM_BOARDS*100)+'%';$('shBarT').textContent=tt('gl_boards',{a:nf(d),b:nf(SM_BOARDS)});$('shBarW').hidden=!got&&!pl;
 $('shMsg').textContent=got?tt('gl_done'):pl?tt('gl_unlock',{n:nf(SM_BOARDS)}):tt('gl_locked');$('shPlay').hidden=!(got||pl);$('shPlay').textContent=got?tt('gl_again'):(d?tt('cont'):tt('gl_play'));$('shDiffT').textContent=tt('sh_'+TIERK[shTier]+'_d');$('shDiff').hidden=$('shDiffT').hidden=!(got||pl);$('shDiff').innerHTML=[0,1,2].map(k=>`<button data-t="${k}"${k===shTier?' class="on"':''}>${tt('sh_'+TIERK[k])}</button>`).join('');$('shSheet').classList.remove('out');$('shSheet').hidden=false}
function startShape(n,fresh,tier){const sv=readSave('sm');if(sv&&sv.custom.shape===n&&!fresh)return play('sm');if(sv&&!confirm(tt('confirm_discard')))return;const d=P.sm[n]||0;newLevel({sm:true,shape:n,idx:(fresh||d>=SM_BOARDS)?0:d,tier:tier==null?smTier(n):tier})}
const RENDER={
 home(){const s=streakNow(),tr=tierOf(P.xp||0),done=!!P.daily[dayKey()],d=levelDiff(P.level);$('streakN').textContent=nf(s);$('starN').textContent=nf(Object.values(P.stars).reduce((a,b)=>a+b,0));$('achN').textContent=nf(ACH.filter(a=>P.ach[a[0]]).length)+'/'+nf(ACH.length);$('streakChip').classList.toggle('on',s>0);
  $('lvTxt').textContent=nf(P.level);$('homeDiff').textContent=tt('diff_'+d.k);$('homeDiff').style.color=dcol(d.c);$('playBtn').textContent=readSave('main')?tt('cont'):tt('play');
  $('leagueIc').innerHTML=shield(tr.id);$('leagueName').textContent=tt('tier_'+tr.id);
  $('chDate').textContent=new Date().toLocaleDateString(calLoc(),{month:'long',day:'numeric'});$('chIc').innerHTML=cup(done);$('chBtn').textContent=done?tt('done'):(()=>{const sv=readSave('daily');return sv&&sv.custom.day===dayKey()?tt('cont'):tt('play')})();$('chCard').classList.toggle('done',done);$('taBest').textContent=tt('mode_best',{n:nf(P.stats.taBest)});$('endBest').textContent=tt('mode_best',{n:nf(P.stats.endBest)})},
 levels(){const top=P.level,tot=Object.values(P.stars).reduce((a,b)=>a+b,0);$('lvSum').textContent=tt('lv_sum',{a:nf(tot),b:nf((top-1)*3)});
  $('lvTiers').innerHTML=DIFF_WIN.slice(0,-1).map((lo,k)=>{const hi=DIFF_WIN[k+1]-1,a=DIFF[k],b=DIFF[k+1];return`<span class="tier${P.level>=lo&&P.level<=hi?' cur':''}"><i style="background:${a[1]}"></i><i style="background:${b[1]}"></i>${nf(lo)}–${nf(hi)} · ${tt('diff_'+a[0])} / ${tt('diff_'+b[0])}</span>`}).join('')+`<span class="tier${P.level>=DIFF_WIN[7]?' cur':''}"><i style="background:${DIFF[7][1]}"></i>${nf(DIFF_WIN[7])}+ · ${tt('diff_mythic')}</span>`;
  $('lvGrid').innerHTML=Array.from({length:top+3},(_,i)=>{const n=i+1,lk=n>top;return`<button class="lv${n===top?' cur':''}${lk?' lk':''}" data-n="${n}" style="--d:${Math.min(i,24)*14}ms"${lk?' disabled':''}><b>${nf(n)}</b><span>${lk?ic(IC.lock).replace('class="ic"','class="ic lk"'):starsHtml(P.stars[n]||0)}</span></button>`}).join('');animRestart($('lvGrid'))},
 league(){const xp=P.xp||0,tr=tierOf(xp);$('lgIc').innerHTML=shield(tr.id);$('lgName').textContent=tt('tier_'+tr.id);$('lgTotal').textContent=tt('lg_total',{n:nf(xp)});
  const nx=tr.next;$('lgBar').style.width=(nx?(xp-tr.xp)/(nx.xp-tr.xp)*100:100)+'%';$('lgXp').textContent=nx?tt('lg_xp',{a:nf(xp-tr.xp),b:nf(nx.xp-tr.xp)}):tt('lg_max');
  $('ladder').innerHTML=TIERS.map((x,i)=>`<div class="row${i===tr.i?' cur':''}${i>tr.i?' lk':''}">${shield(x.id)}<b>${tt('tier_'+x.id)}</b><span class="note">${nf(x.xp)} ${P.lang==='fa'?'امتیاز':'XP'}</span></div>`).join('')},
 challenge(){if(!chView){chView=monthStart(noon());chSel=dayKey()}
  const today=noon(),tk=dayKey(today),days=monthDays(chView),[lo,hi]=unlockedMonths(),done=days.filter(d=>P.daily[dayKey(d)]).length,total=days.length;
  $('mTitle').textContent=chView.toLocaleDateString(calLoc(),{month:'long',year:'numeric'});$('mDone').textContent=nf(done);$('mTotal').textContent=nf(total);
  $('mFill').style.width='calc(36px + (100% - 36px) * '+(done/total)+')';$('mDone').style.left='calc((100% - 36px) * '+(done/total)+')';$('chBigIc').innerHTML=cup(done===total);
  $('mPrev').disabled=chView.getTime()<=lo.getTime();$('mNext').disabled=chView.getTime()>=hi.getTime();
  const ws=P.lang==='fa'?6:1,hdr=Array.from({length:7},(_,i)=>{const s=new Date(2024,0,7+((ws+i)%7),12).toLocaleDateString(loc(),{weekday:P.lang==='fa'?'narrow':'short'});return`<div class="wd">${P.lang==='fa'?s:s.slice(0,2)}</div>`}).join('');
  const lead=(days[0].getDay()-ws+7)%7;
  $('cal').innerHTML=hdr+'<i></i>'.repeat(lead)+days.map(d=>{const k=dayKey(d),dn=!!P.daily[k],fut=k>tk,isT=k===tk;
   return`<button class="day${dn?' done':''}${isT&&!dn?' tdy':''}${!dn&&!isT&&!fut?' past':''}${fut?' fut':''}${k===chSel?' sel':''}" data-k="${k}"${fut?' disabled':''}>${nf(cparts(d).day)}</button>`}).join('');
  const sd=fromKey(chSel);$('chPlay').textContent=(()=>{const sv=readSave('daily');return sv&&sv.custom.day===chSel?tt('cont'):P.daily[chSel]?tt('again'):tt('play')})();
  {const ds=P.dstreak,rd=[];for(let i=13;i>=0;i--){const d=noon();d.setDate(d.getDate()-i);rd.push(d)}
   $('chStreak').innerHTML=`<div><small>${tt('ch_streak_t')}</small><b>${tt('ch_days',{n:nf(dstreakNow())})}</b><span>${tt('ch_best',{n:nf(ds.best||0)})}</span></div><i>${ic(IC.flame)}</i>`;
   $('chRecent').innerHTML=`<h3>${tt('ch_recent')}</h3><div class="rdg">`+rd.map(d=>{const k=dayKey(d),dn=!!P.daily[k];return`<button class="rd${k===tk?' tdy':''}${dn?' ok':''}" data-k="${k}"><small>${d.toLocaleDateString(loc(),{weekday:'narrow'})}</small><b>${nf(cparts(d).day)}</b><span>${dn?ic(IC.check):''}</span></button>`}).join('')+`</div><div class="note">${tt('ch_rule')}</div>`}
  $('chStats').textContent=tt('ch_sel',{d:sd.toLocaleDateString(calLoc(),{month:'long',day:'numeric'})})+' · '+tt('ch_streak',{n:nf(streakNow())})},
 collection(){[...$('coTabs').children].forEach(b=>b.classList.toggle('on',b.dataset.v===coView));$('coShapes').hidden=coView!=='shapes';$('coAch').hidden=coView!=='ach';
  const got=SHAPES.filter(n=>P.shapes[n]).length,tot=SHAPES.length,C=2*Math.PI*26,nx=SHAPE_ORDER.find(n=>!P.shapes[n]);
  $('glRing').innerHTML=`<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="none" stroke="var(--btn)" stroke-width="7"/><circle cx="32" cy="32" r="26" fill="none" stroke="var(--acc)" stroke-width="7" stroke-linecap="round" stroke-dasharray="${C*got/tot} ${C}" transform="rotate(-90 32 32)"/></svg>`+ic(IC.images);
  $('glCount').textContent=tt('gl_collected',{n:nf(got)});$('glOf').textContent=tt('gl_of',{n:nf(tot)});
  $('glSub').textContent=got?[0,1,2].map(t=>tt('sh_'+TIERK[t])+' '+nf(SHAPE_ORDER.filter(n=>smTier(n)===t&&P.shapes[n]).length)+'/'+nf(SHAPE_ORDER.filter(n=>smTier(n)===t).length)).join(' · '):tt('gl_first');
  $('glNext').hidden=!nx;if(nx)$('glNext').textContent=tt('gl_next')+' · '+shapeName(nx);
  chipsSet($('glFilter'),[['all','gl_all'],['got','gl_got'],['0','sh_easy'],['1','sh_medium'],['2','sh_hard']],glF);
  $('grid').innerHTML=SHAPE_ORDER.map((n,i)=>[n,i]).filter(([n])=>glF==='all'||(glF==='got'?P.shapes[n]:smTier(n)===+glF)).map(([n,i],k)=>{const g1=!!P.shapes[n],pl=playable(n);
   return`<button class="gt${g1?'':pl?' pl':' lock'}" data-s="${n}" style="--d:${Math.min(k,14)*22}ms"><span class="no">#${nf(i+1)}</span>${g1||pl?`<img src="assets/shapes/${n}.png" alt="" loading="lazy" decoding="async">`:''}${g1?'':pl?ic(IC.playi):ic(IC.lock)}<span class="nm">${g1?shapeName(n):'???'}</span></button>`}).join('');animRestart($('grid'));
  $('coTroph').textContent=tt('co_trophies',{n:nf(Object.keys(P.daily).length)});
  $('achCount').textContent=tt('ach_count',{a:nf(ACH.filter(a=>P.ach[a[0]]).length),b:nf(ACH.length)});
  $('achList').innerHTML=ACH.map(([id])=>{const on=!!P.ach[id];return`<div class="row${on?'':' lk'}">${cup(on)}<b style="text-align:start"><span>${tt('ach_'+id)}</span><small>${tt('acd_'+id)}</small></b></div>`}).join('')},
 _profile(){const S=P.stats,stars=Object.values(P.stars).reduce((a,b)=>a+b,0),T=(e,n,l)=>`<div class="stt"><i>${e}</i><div><b>${n}</b><span>${l}</span></div></div>`;
  $('prAv').textContent=AVATARS[P.avatar%AVATARS.length];$('prName').textContent=P.name;$('prLv').textContent=nf(P.level);$('prSt').textContent=nf(stars);$('prXp').textContent=nf(P.xp||0);
  $('prBody').innerHTML=[T('✅',nf(Math.max(0,P.level-1)),tt('s_levels')),T('⭐',nf(Object.values(P.stars).filter(v=>v>=3).length),tt('s_3star')),T('➤',nf(S.arrows||0),tt('s_arrows')),T('🗓',nf(Object.keys(P.daily).length),tt('s_dailies')),T('🖼',nf(SHAPES.filter(n=>P.shapes[n]).length)+'/'+nf(SHAPES.length),tt('s_shapes')),T('❤',nf(S.flawless||0),tt('s_flawless')),T('⚡','x'+nf(S.bestCombo||0),tt('s_combo')),T('🔥',nf(streakNow()),tt('s_daystreak',{b:nf(S.bestStreak||0)})),T('💡',nf(P.items.hints),tt('s_hints'))].join('')},
 custom(){renderShapePick();$('genCont').hidden=!readSave('gen');const lk=P.level<K.GEN_UNLOCK;$('lockNote').hidden=!lk;$('genBtn').disabled=lk;syncSliders()},
 settings(){syncSet();renderProfile()}};
function renderProfile(){RENDER._profile();const tr=tierOf(P.xp||0),stars=Object.values(P.stars).reduce((a,b)=>a+b,0);$('prMeta').textContent=tt('tier_'+tr.id)+' · ⭐ '+nf(stars)}
// ---- settings
const renderTheme=()=>{$('themeRow').innerHTML=Object.keys(THEMES).map(k=>{const t=THEMES[k],dot=t.dot||mixc(t.bg,t.snake,.18);
 const dots=[0,1,2].map(r=>[0,1,2,3,4].map(c=>`<circle cx="${12+c*17}" cy="${14+r*16}" r="2.6" fill="${dot}"/>`).join('')).join('');
 const svg=`<svg viewBox="0 0 120 76" aria-hidden="true"><rect x=".5" y=".5" width="119" height="75" rx="10" fill="${t.bg}" stroke="${t.fg}" stroke-opacity=".22"/>${dots}<path d="M14 60H58a11 11 0 0 0 11-11V32" fill="none" stroke="${t.snake}" stroke-width="7" stroke-linecap="round"/><path d="M69 17l10 15H59z" fill="${t.snake}" stroke="${t.snake}" stroke-width="3" stroke-linejoin="round"/><rect x="78" y="42" width="34" height="26" rx="7" fill="${t.card}"/><rect x="82" y="47" width="26" height="7" rx="3.5" fill="${t.btn}"/><rect x="82" y="58" width="26" height="7" rx="3.5" fill="${t.acc}"/></svg>`;
 return`<button class="thm" data-t="${k}" aria-label="${tt('th_'+k)}">${svg}<span>${tt('th_'+k)}</span><i class="ck">${ic(IC.check)}</i></button>`}).join('')};
const syncSet=()=>{$('remChk').checked=!!P.rem.on;$('remHour').value=P.rem.hour;$('remRow').hidden=!P.rem.on;[...$('themeRow').children].forEach(b=>b.classList.toggle('on',b.dataset.t===P.theme));[...$('speedSel').children].forEach(b=>b.classList.toggle('on',b.dataset.v===P.speed));[...$('langSel').children].forEach(b=>b.classList.toggle('on',b.dataset.v===P.lang))};
function applyLang(){const d=document.documentElement;d.lang=P.lang;d.dir=P.lang==='fa'?'rtl':'ltr';document.title=tt('title');
 document.querySelectorAll('[data-i]').forEach(e=>e.textContent=tt(e.dataset.i));document.querySelectorAll('[data-ia]').forEach(e=>{e.title=tt(e.dataset.ia);e.setAttribute('aria-label',tt(e.dataset.ia))});
 renderTheme();syncSet();syncSliders();if(lvl&&!$('game').hidden)hud();if($('game').hidden)(RENDER[curPage]||(()=>{}))()}
$('themeRow').onclick=e=>{const b=e.target.closest('button');if(!b)return;P.theme=b.dataset.t;save();theme();syncSet()};
$('speedSel').onclick=e=>{const b=e.target.closest('button');if(!b)return;P.speed=b.dataset.v;save();syncSet()};
$('langSel').onclick=e=>{const b=e.target.closest('button');if(!b)return;P.lang=b.dataset.v;save();applyLang()};
$('fillChk').checked=P.fill;$('cbChk').checked=P.cb;$('hcChk').checked=P.hc;
$('remHour').innerHTML=Array.from({length:16},(_,i)=>`<option value="${i+8}">${nf(i+8)}:00</option>`).join('');
function remCheck(){const r=P.rem;if(!r.on||!('Notification' in window)||Notification.permission!=='granted')return;const k=dayKey();if(r.last===k||new Date().getHours()<r.hour||P.daily[k])return;r.last=k;save();
 const t=tt('title'),o={body:tt('rem_body'),icon:'assets/icon-192.png',tag:'arrow-zen-daily'};
 (navigator.serviceWorker?navigator.serviceWorker.getRegistration():Promise.resolve(null)).then(g=>g?g.showNotification(t,o):new Notification(t,o)).catch(()=>{try{new Notification(t,o)}catch{}})}
$('remChk').onchange=e=>{if(!e.target.checked){P.rem.on=false;save();syncSet();return}
 if(!('Notification' in window)){e.target.checked=false;toast(tt('rem_unsup'),2600);return}
 Promise.resolve(Notification.requestPermission()).then(p=>{if(p==='granted'){P.rem.on=true;P.rem.last='';save();syncSet();remCheck()}else{e.target.checked=false;P.rem.on=false;save();syncSet();toast(tt('rem_denied'),2600)}})};
$('remHour').onchange=e=>{P.rem.hour=+e.target.value;P.rem.last='';save();remCheck()};
setInterval(remCheck,60000);document.addEventListener('visibilitychange',remCheck);
$('cbChk').onchange=e=>{P.cb=e.target.checked;save();theme()};$('hcChk').onchange=e=>{P.hc=e.target.checked;save();theme()};
$('fillChk').onchange=e=>{P.fill=e.target.checked;save();syncSliders()};
$('nav').onclick=e=>{const b=e.target.closest('button');if(b)show(b.dataset.p)};
// ---- generator page
let cShape=null;
function syncSliders(){const mx=P.fill?K.MAXFILL:K.GEN_MAX;['cw','ch'].forEach(id=>{const e=$(id);e.min=K.GEN_MIN;e.max=mx;if(+e.value>mx)e.value=mx;$(id+'V').textContent=nf(e.value)});$('genCells').textContent=tt('gen_cells',{n:nf($('cw').value*$('ch').value)})}
let cF='all';
function renderShapePick(){chipsSet($('shF'),[['all','gl_all'],['0','sh_easy'],['1','sh_medium'],['2','sh_hard']],cF);
 $('shapes').innerHTML=['',...SHAPE_ORDER.filter(n=>cF==='all'||smTier(n)===+cF)].map((n,k)=>`<button data-s="${n}" style="--d:${Math.min(k,14)*22}ms" class="${(n||null)===cShape?'on':''}">${n?`<img src="assets/shapes/${n}.png" alt="" loading="lazy" decoding="async">`:'▭'}</button>`).join('');
 $('shapes').scrollTop=0;animRestart($('shapes'));shSelTxt()}
function shSelTxt(){$('shSel').textContent=tt('gen_sel',{n:cShape?shapeName(cShape):tt('gen_rect')})}
$('shF').onclick=e=>{const b=e.target.closest('button');if(!b)return;cF=b.dataset.f;renderShapePick()};
$('shapes').onclick=e=>{const b=e.target.closest('button');if(!b)return;cShape=b.dataset.s||null;[...$('shapes').children].forEach(x=>x.classList.toggle('on',x===b));shSelTxt()};
['cw','ch'].forEach(id=>$(id).oninput=syncSliders);
$('genCont').onclick=()=>play('gen');$('genBtn').onclick=()=>{if(readSave('gen')&&!confirm(tt('confirm_discard')))return;newLevel({w:+$('cw').value,h:+$('ch').value,shape:cShape})};
// ---- daily / league / game buttons
function startDaily(k){k=k||dayKey();const sv=readSave('daily');if(sv&&sv.custom.day===k)return play('daily');if(sv&&!confirm(tt('confirm_discard')))return;newLevel({daily:true,day:k})}
$('chBtn').onclick=()=>P.daily[dayKey()]?show('challenge'):startDaily(dayKey());$('chPlay').onclick=()=>startDaily(chSel);
$('chRecent').onclick=e=>{const b=e.target.closest('button.rd');if(b)startDaily(b.dataset.k)};
$('cal').onclick=e=>{const b=e.target.closest('button.day');if(!b||b.disabled)return;chSel=b.dataset.k;RENDER.challenge()};
const moveMonth=n=>{chView=addMonth(chView,n);const hi=unlockedMonths()[1],tk=dayKey(noon());chSel=chView.getTime()===hi.getTime()?tk:dayKey(monthDays(chView).slice(-1)[0]);RENDER.challenge()};
$('mPrev').onclick=()=>moveMonth(-1);$('mNext').onclick=()=>moveMonth(1);$('leagueBtn').onclick=()=>show('league');
$('playBtn').onclick=play;$('backBtn').onclick=()=>show(custom&&custom.sm?'collection':'home');$('restartBtn').onclick=restart;$('regenBtn').onclick=()=>newLevel(custom);$('hintBtn').onclick=hint;$('refillBtn').onclick=()=>{if(P.items.refills<=0||lives>0||run||!lvl)return;P.items.refills--;lives=maxLives;prevLives=null;save();$('overOv').hidden=true;hud();persist()};$('undoBtn').onclick=undo;$('retryBtn').onclick=()=>run?startRun(run.type):restart();
$('lvlBtn').onclick=()=>show('levels');$('taBtn').onclick=()=>startRun('ta');$('endBtn').onclick=()=>startRun('endless');
$('grid').onclick=e=>{const b=e.target.closest('button.gt');if(b)openSheet(b.dataset.s)};$('glFilter').onclick=e=>{const b=e.target.closest('button');if(!b)return;glF=b.dataset.f;RENDER.collection()};
$('glNext').onclick=()=>{const nx=SHAPE_ORDER.find(n=>!P.shapes[n]);if(nx)startShape(nx)};$('shClose').onclick=hideSheet;$('shSheet').onclick=e=>{if(e.target===$('shSheet'))hideSheet()};$('shPlay').onclick=()=>{const n=glSel;$('shSheet').hidden=true;P.smd=P.smd||{};P.smd[n]=shTier;save();startShape(n,!!P.shapes[n],shTier)};
$('shDiff').onclick=e=>{const b=e.target.closest('button');if(!b)return;shTier=+b.dataset.t;$('shDiffT').textContent=tt('sh_'+TIERK[shTier]+'_d');[...$('shDiff').children].forEach(x=>x.classList.toggle('on',+x.dataset.t===shTier))};

$('prAvBtn').onclick=()=>{P.avatar=(P.avatar+1)%AVATARS.length;save();renderProfile()};$('prEdit').onclick=()=>{const v=prompt(tt('pr_name_q'),P.name);if(v&&v.trim()){P.name=v.trim().slice(0,18);save();renderProfile()}};
let paneTok=0;
$('coTabs').onclick=e=>{const b=e.target.closest('button');if(!b||!b.dataset.v||b.dataset.v===coView)return;
 const oldB=[...$('coTabs').children].find(x=>x.dataset.v===coView),oldEl=coView==='shapes'?$('coShapes'):$('coAch');coView=b.dataset.v;
 const newEl=coView==='shapes'?$('coShapes'):$('coAch'),d=Math.sign(b.getBoundingClientRect().left-(oldB?oldB.getBoundingClientRect().left:0))||1,tok=++paneTok;
 RENDER.collection();
 if(!oldEl.animate||reduced())return;newEl.hidden=true;oldEl.hidden=false;
 oldEl.animate([{opacity:1,transform:'none'},{opacity:0,transform:`translateX(${-d*28}px)`}],{duration:170,easing:'ease-in'}).onfinish=()=>{if(tok!==paneTok)return;oldEl.hidden=true;newEl.hidden=false;newEl.animate([{opacity:0,transform:`translateX(${d*40}px)`},{opacity:1,transform:'none'}],{duration:380,easing:'cubic-bezier(.22,1,.36,1)'})}};

$('lvGrid').onclick=e=>{const b=e.target.closest('button.lv');if(!b||b.disabled)return;const n=+b.dataset.n;
 if(n===P.level){if(readSave('main'))return play('main');return newLevel()}
 const sv=readSave('replay');if(sv&&sv.custom.replay===n)return play('replay');if(sv&&!confirm(tt('confirm_discard')))return;newLevel({replay:n})};
let deferredInstall=null;addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstall=e;$('instRow').hidden=false});addEventListener('appinstalled',()=>$('instRow').hidden=true);
$('instBtn').onclick=async()=>{if(!deferredInstall)return;deferredInstall.prompt();try{await deferredInstall.userChoice}catch{}deferredInstall=null;$('instRow').hidden=true};
$('nextBtn').onclick=()=>{$('winOv').hidden=true;custom?(custom.daily?show('challenge',true):custom.replay?show('levels'):custom.sm?(custom.idx+1<SM_BOARDS?newLevel({sm:true,shape:custom.shape,idx:custom.idx+1,tier:custom.tier}):(coView='shapes',show('collection'))):show('home')):newLevel()};
$('resetBtn').onclick=resetView;$('guideBtn').onclick=()=>{guide=!guide;guideFrom=guideA;guideTo=guide?1:0;guideT=performance.now()};
addEventListener('resize',resize);addEventListener('keydown',e=>{if(e.key==='Tab')document.documentElement.classList.add('kbd');if($('game').hidden)return;const k=e.key.toLowerCase();
 if(k==='h')hint();else if(k==='u')undo();else if(k==='r')restart();else if(k==='escape')show('home');
 else if(k.startsWith('arrow')){e.preventDefault();kbdMove(k==='arrowleft'||k==='arrowup'?-1:1)}
 else if((k==='enter'||k===' ')&&kbdMode&&kSel!=null&&(!document.activeElement||document.activeElement===document.body)){e.preventDefault();const s=lvl.snakes.find(q=>q.id===kSel);if(s&&!loading&&lives>0&&!entering&&!won)activate(s,new LineOfSight(lvl,new Set(removal.keys())).blocked(s))}});
addEventListener('pointerdown',()=>{document.documentElement.classList.remove('kbd');kbdMode=false},true);
theme();applyLang();show('home');remCheck();addEventListener('resize',()=>{moveBub(false);segAll(false)});document.querySelectorAll('.seg').forEach(el=>segObs.observe(el,{attributes:true,attributeFilter:['class'],subtree:true,childList:true}));if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>moveBub(false));resize();requestAnimationFrame(draw);
if('serviceWorker' in navigator&&/^https?:/.test(location.protocol))addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
})();
