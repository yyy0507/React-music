//该文件存放要操作的对象，必须有一个type属性表示要执行的操作，当应用规模越来越大的时候最好分模块定义

import * as ActionTypes from "./actionTypes"
/**
 * Action是把数据从应用传到store的有效载荷。它是store数据的唯一来源
 */

//Action创建函数，用来创建action对象。使用action创建函数更容易被移植和测试

export function showPlayer(showStatus) {
	return {type:ActionTypes.SHOW_PLAYER, showStatus};
}

export function changeSong(song) {
 	return {type:ActionTypes.CHANGE_SONG, song};
}

export function removeSong(id) {
	return {type:ActionTypes.REMOVE_SONG_FROM_LIST, id};
}

export function setSongs(songs) {
	return {type:ActionTypes.SET_SONGS, songs};
}
