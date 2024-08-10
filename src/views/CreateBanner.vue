<template>
    <div class="container">
        <div>
            <canvas id="canvas" class="canvas" style="background:gray;width: 640px; height:360px;"></canvas>
            <div class="mb-4">
                <input type="file" id="inp" @change="drawCustom()">
            </div>
            <div>
                <div class="form mb-3">
                    <h4>Title</h4>
                    <input @change="draw()" class="input form-control input-block w-100" type="text" v-model="title">
                </div>
            </div>
            <h4>Logo</h4>
            <div class="d-flex">
                <UiButton class="btn btn-xxs gradient-blue blue mr-4" @click="isLeft = true, draw()">
                    Left
                </UiButton>
                <UiButton class="btn btn-xxs gradient-blue blue mr-4" @click="isLeft = false, draw()">
                    Right
                </UiButton>
                <UiButton class="btn btn-xxs gradient-blue blue mr-4" @click="isTop = true, draw()">
                    Top
                </UiButton>
                <UiButton class="btn btn-xxs gradient-blue blue mr-4" @click="isTop = false, draw()">
                    Bottom
                </UiButton>
                <!-- <UiButton @click="addRemove" class="col-3 green w-100">
                    Add/Remove data
                </UiButton> -->
            </div>
            <h4>Text</h4>
            <div class="d-flex">
                <UiButton class="btn btn-xxs gradient-blue blue mr-4" @click="isTextTop = true, draw()">
                    Top
                </UiButton>
                <UiButton class="btn btn-xxs gradient-blue blue mr-4" @click="isTextTop = false, draw()">
                    Bottom
                </UiButton>
                <!-- <UiButton @click="addRemove" class="col-3 green w-100">
                    Add/Remove data
                </UiButton> -->
            </div>
            <UiButton @click="save" class="btn btn-xxs gradient-green w-100">
                Save (need rename after as .png)
            </UiButton>
        </div>
    </div>
</template>



<script>
import numeral from 'numeral';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            title: this.$route.query.title || "Lead your gang, control the city!",
            isLeft: this.$route.query.isLeft || true,
            isTop: this.$route.query.isTop || true,
            isTextTop: this.$route.query.isTextTop || false,
            imageSources: ["", "/img/icons/logo.png"],
            hasData: this.$route.query.hasData || false,
        };
    },
    async mounted() {
        const self = this
        self.hideLoading();
        setTimeout(() => {
            self.draw()

        }, 3000);
    },
    methods: {
        ...mapActions(['hideLoading']),

        addRemove() {
            this.hasData = !this.hasData
            this.draw()
        },
        drawBackground() {
            var img = new Image();
            const input = document.getElementById('inp');
            img.src = URL.createObjectURL(input.files[0]);
            this.draw(img)
        },
        drawCustom() {
            const self = this
            var img = new Image();
            const input = document.getElementById('inp');

            img.src = URL.createObjectURL(input.files[0]);
            this.imageSources[0] = img.src
            setTimeout(() => {
                self.draw()

            }, 1000);
        },
        loadImage(imagePath) {
            return new Promise((resolve, reject) => {
                let image = new Image();
                image.addEventListener("load", () => {
                    resolve(image);
                });
                image.addEventListener("error", (err) => {
                    resolve(err);
                });
                image.src = imagePath;
            });
        },
        async draw(img, ox, yx, x, y) {
            let marginTop = this.isTop ? 40 : 270
            if (this.hasData === true || this.hasData === "true")
                marginTop = 0
            const canvas = document.getElementById("canvas");
            canvas.width = 640;
            canvas.height = 360;
            const context = canvas.getContext("2d")
            context.font = "90px Conthrax";
            Promise
                .all(this.imageSources.map(i => this.loadImage(i)))
                .then((images) => {
                    images.forEach((image) => {
                        if (image.src && image.src.includes("logo")) {
                            if (this.isLeft === true || this.isLeft === "true")
                                context.drawImage(image, 40, marginTop, 175, 57);

                            else
                                context.drawImage(image, 640 - 175 - 40, marginTop, 175, 57);
                        }
                        if (image.src && !image.src.includes("logo")) {
                            context.drawImage(image, 0, 0, 640, 360);
                        }

                        context.shadowColor = "#000";
                        context.shadowOffsetX = 2;
                        context.shadowOffsetY = 4;
                        context.fillStyle = "#fff"
                        context.shadowBlur = 15;
                        context.strokeStyle = "#000";
                        context.lineWidth = 0;
                        // context.fillStyle = "#000"

                        const textTop = this.isTextTop ? 40 : 340
                        if (this.title) {
                            context.font = "18px Conthrax";
                            context.textAlign = "center";
                            this.wrapText(context, this.title.toUpperCase(), 320, textTop, 640, 90)
                            // if (this.isLeft === true || this.isLeft === "true") {
                            //     this.wrapText(context, this.title, 50, 280 + marginTop, 640, 90)
                            // }
                            // else {
                            //     context.textAlign = "center";
                            //     this.wrapText(context, this.title, 590, 280 + marginTop, 640, 90)
                            // }
                        }



                    });
                }).catch((err) => {
                    console.error(err);
                });

        },
        wrapText(context, text, x, y, maxWidth, lineHeight) {
            const words = text.split(' ');
            let line = '';
            for (let n = 0; n < words.length; n++) {
                const testLine = `${line + words[n]} `;
                const metrics = context.measureText(testLine);
                const testWidth = metrics.width;



                if (testWidth > maxWidth) {
                    context.strokeText(line, x, y);
                    context.fillText(line, x, y);

                    line = `${words[n]} `;
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            context.strokeText(line, x, y);
            context.fillText(line, x, y);
            return y;
        },
        save() {
            var canvas = document.getElementById('canvas');
            var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            var a = document.createElement('a');
            a.href = image;
            document.body.appendChild(a);
            a.download = 'Dw_Banner.png';

            window.location.href = image;
        }
    }
};
</script>


<style>
.canvas {
    width: 1600px;
    height: 900px;
}
</style>