import {connect} from "react-redux";
import {showPlayer, changeSong} from "../redux/actions";
import Player from "../components/play/Player";

//映射Redux全局的state到组件props上
//mapStateToProps函数将store的状态映射到组件的props上，Player组件会订阅store，
//当store的状态发生修改时会调用render方法触发更新
const mapStateToProps = (state) => ({
	showStatus: state.showStatus,
	currentSong: state.song,
	playSongs: state.songs
});

//映射dispatch到props上
const mapDispatchToProps = (dispatch) => ({
	showMusicPlayer: (status) => {
		dispatch(showPlayer(status));
	},
	changeCurrentSong: (song) => {
		dispatch(changeSong(song));
	}
});

//将ui组件包装成为容器组件
export default connect(mapStateToProps,mapDispatchToProps)(Player)