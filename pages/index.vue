<template>
  <v-container>
    <v-file-input v-model="myFile" @change="onFileChange">
      File to upload to S3
    </v-file-input>
    <v-btn @click="logger()">check buckets</v-btn>
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
      logger () {
        this.$s3.listBuckets(function(err, res) {
          console.log(err||res)
        });
      },
      upload () {

        this.returnedData = this.$s3.uploadFile(this.myFile)



        // this.$s3.upload({
        //   Body: this.myFile,
        //   Key: this.myFile.name,
        //   Bucket: "sopolyglot-dev",
        //   ACL: 'public-read'
        // }, (err, data) => {
        //   if (err) {
        //       throw err;
        //   }
        //   console.log(data);
        //   this.returnedData = data.Location
        // })
        
      },
      uploadFile () {
        console.log(this.$s3.uploadFile(this.myFile));
        this.returnedData = this.$s3.uploadFile(this.myFile)
      },
      onFileChange() {
        console.log(this.myFile);
      },
      // this.$s3.listBuckets(function(err, res) {
      //   console.log(err||res)
      // });
    }

  }
</script>
