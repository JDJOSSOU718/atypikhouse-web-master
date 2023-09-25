<template>
    <div class="news-area ptb-60">
        <div class="container">
            <div class="section-title">
                <h2><span class="dot"></span> Bloster News</h2>
            </div>

            <div class="row">
                <div class="news-slides owl-carousel owl-theme">
                    <carousel
                        :autoplay="true"
                        :autoplayTimeout="1000"
                        :perPageCustom="[[0, 1],[768, 2],[1024, 3],[1200, 3]]"
                    >
                        <slide>
                            <div class="col-lg-12 col-md-12">
                                <div class="single-blog-post-box">
                                    <div class="blog-image">
                                        <a href="#"><img src="../../assets/img/news-image/img1.jpg" alt="image"></a>
                                    </div>

                                    <div class="post-content">
                                        <ul class="post-meta">
                                            <li>By: <a href="#">Admin</a></li>
                                            <li>20 February, 2021</li>
                                        </ul>
                                        <h3><a href="#">Evolving Ecommerce: 14 Trends Driving Online Retail In 2021</a></h3>
                                    </div>
                                </div>
                            </div>
                        </slide>

                        <slide>
                            <div class="col-lg-12 col-md-12">
                                <div class="single-blog-post-box">
                                    <div class="blog-image">
                                        <a href="#"><img src="../../assets/img/news-image/img2.jpg" alt="image"></a>
                                    </div>

                                    <div class="post-content">
                                        <ul class="post-meta">
                                            <li>By: <a href="#">Admin</a></li>
                                            <li>20 February, 2021</li>
                                        </ul>
                                        <h3><a href="#">The Best Ecommerce Platform for Growing Sales</a></h3>
                                    </div>
                                </div>
                            </div>
                        </slide>

                        <slide>
                            <div class="col-lg-12 col-md-12">
                                <div class="single-blog-post-box">
                                    <div class="blog-image">
                                        <a href="#"><img src="../../assets/img/news-image/img3.jpg" alt="image"></a>
                                    </div>

                                    <div class="post-content">
                                        <ul class="post-meta">
                                            <li>By: <a href="#">Admin</a></li>
                                            <li>20 February, 2021</li>
                                        </ul>
                                        <h3><a href="#">A Green Brand Finding Roots in Sustainability</a></h3>
                                    </div>
                                </div>
                            </div>
                        </slide>

                        <slide>
                            <div class="col-lg-12 col-md-12">
                                <div class="single-blog-post-box">
                                    <div class="blog-image">
                                        <a href="#"><img src="../../assets/img/news-image/img4.jpg" alt="image"></a>
                                    </div>

                                    <div class="post-content">
                                        <ul class="post-meta">
                                            <li>By: <a href="#">Admin</a></li>
                                            <li>20 February, 2021</li>
                                        </ul>
                                        <h3><a href="#">Don’t Miss These Top Ecommerce Conferences in 2021</a></h3>
                                    </div>
                                </div>
                            </div>
                        </slide>

                        <slide>
                            <div class="col-lg-12 col-md-12">
                                <div class="single-blog-post-box">
                                    <div class="blog-image">
                                        <a href="#"><img src="../../assets/img/news-image/img5.jpg" alt="image"></a>
                                    </div>

                                    <div class="post-content">
                                        <ul class="post-meta">
                                            <li>By: <a href="#">Admin</a></li>
                                            <li>20 February, 2021</li>
                                        </ul>
                                        <h3><a href="#">The Most Popular New top Business eCommerce Apps</a></h3>
                                    </div>
                                </div>
                            </div>
                        </slide>
                    </carousel>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewsSlidesTwo'
}
</script>