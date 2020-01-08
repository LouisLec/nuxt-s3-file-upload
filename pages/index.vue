<template>
  <v-container>
    <v-file-input v-model="myFile" @change="onFileChange">
      File to upload to S3
    </v-file-input>
    <v-btn @click="checkBuckets()">check buckets</v-btn>
    <v-btn @click="upload()">upload</v-btn>
    <v-btn @click="uploadFile()">alt upload</v-btn>
  <v-container>
    {{returnedData}}
  </v-container>
    <v-img scr=""/>
    <v-img
      :src="returnedData"
      lazy-src="https://picsum.photos/id/11/10/6"
      aspect-ratio="1"
      class="grey lighten-2"
      max-width="500"
      max-height="300"
    ></v-img>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
      myFile: null,
      returnedData: '',
      }
    },
    methods: {
      checkBuckets () {
        this.$s3.listBuckets(function(err, res) {
          console.log(err||res)
        });
      },
      upload () {
        this.$s3.upload({
          Body: this.myFile,
          Key: this.myFile.name,
          Bucket: "sopolyglot-dev",
          ACL: 'public-read'
        }, (err, data) => {
          if (err) {
              throw err;
          }
          console.log(data);
          this.returnedData = data.Location
        })
        
      },
      uploadFile () {
        this.$s3.uploadFile(this.myFile).then(data=>this.returnedData=data)
      },
      onFileChange() {
        console.log(this.myFile);
      },
    }

  }
</script>
