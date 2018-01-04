import React , { Component } from "react";
import  Swiper from "swiper";
import {getCarousel} from "@/api/recommend";
import {CODE_SUCCESS} from "@/api/config";
import './recommend.styl';
import "swiper/dist/css/swiper.css";

export default class Recommend extends Component{

	constructor(props){
		super(props);
		this.state = {
			slideList: []
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
	};

//点击跳转
	toLink(linkUrl){
		return () => {
			window.location.href = linkUrl;
		};
	}

	render(){
		return (
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
				<div></div>
			</div>
		);
	}
}