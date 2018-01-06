import React , { Component } from "react";
import Swiper from "swiper";
import {getCarousel, getNewAlbum} from "@/api/recommend";
import {CODE_SUCCESS} from "@/api/config";
import * as AlbumModel from "@/model/album";
import Scroll from "@/common/scroll/Scroll";
import './recommend.styl';
import "swiper/dist/css/swiper.css";

export default class Recommend extends Component{

	constructor(props){
		super(props);
		this.state = {
			slideList: [],
			newAlbums: [],
			refreshScroll: false
		};
	}

//在生命周期函数componentDidMount中，进行发送jsonp的数据请求。
//因为此时DOM 都已经加载完成，在这里进行dom的操作，防止异步请求阻塞UI
	componentDidMount() {
		getCarousel().then((res)=>{
			console.log("获取轮播:");
			if(res) {
				console.log(res);
				if(res.code === CODE_SUCCESS){
					this.setState({
						slideList: res.data.slider
					},()=>{
						if(!this.sliderSwiper) {
							this.sliderSwiper = new Swiper (".slider-container",{
								loop: true,
								autoplay: 3000,
								autoplayDisableOnInteraction: false,
								pagination: ".swiper-pagination"
							});
						}
					});
				}
			}
		});



    //获取最新专辑
		getNewAlbum().then((res) => {
			//console.log("获取最新专辑：");
			if (res) {
				//console.log(res);
				if (res.code === CODE_SUCCESS) {
					//根据发布时间降序排列
					let albumList = res.albumlib.data.list;
					albumList.sort((a, b) => {
						return new Date(b.public_time).getTime() - new Date(a.public_time).getTime();
					});
					this.setState({
						loading: false,
						newAlbums: albumList
					}, () => {
						//刷新scroll
						this.setState({refreshScroll:true});
					});
				}
			}
		});

	}


//点击跳转
	toLink(linkUrl){
		return () => {
			window.location.href = linkUrl;
		};
	}

	render(){
		let albums = this.state.newAlbums.map(item => {
			let album = AlbumModel.createAlbumByList(item);
			return (
				<div className="album-wrapper" key={album.mId}>
					<div className="left">
						<img src={album.img} width="100%" height="100%" alt={album.name} />
					</div>
					<div className="right">
						<div className="album-name">
							{album.name}
						</div>
						<div className="singer-name">
							{album.singer}
						</div>
						<div className="public-time">
							{album.publicTime}
						</div>
					</div>
				</div>
			);
		});




		return (
		<Scroll refresh={this.state.refreshScroll}>
			
			<div className="music-recommend">
				
				<div className="slider-container">
					<div className="swiper-wrapper">
						{
							this.state.slideList.map(slider => {
								return (
									<div className="swiper-slide" key={slider.id}>
										<a className="slide-nav" onClick={this.toLink(slider.linkUrl)}>
											<img src={slider.picUrl} width="100%" height="100%" alt="推荐" />
										</a>
									</div>
								)
							})
						}
					</div>
					<div className="swiper-pagination"></div>
				</div>
				<div className="album-container">
					<h1 className="title">最新专辑</h1>
					<div className="album-list">
						{albums}
					</div>
				</div>
	
			</div>
		</Scroll>

		);
	}
}