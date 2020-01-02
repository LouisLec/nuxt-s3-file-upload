<template>
  <v-container>
    <v-file-input v-model="myFile" @change="onFileChange">
      File to upload to S3
    </v-file-input>
    <v-btn @click="logger()">check buckets</v-btn>
    <v-btn @click="upload()">upload</v-btn>
    <v-btn @click="fetch()">fetch</v-btn>
  <v-container>
    {{returnedData}}
    {{returnedURL}}
  </v-container>
    <img :scr="returnedURL"/>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
      myFile: null,
      returnedData: null,
      returnedURL: null,
      }
    },
    methods: {
      logger () {
        this.$s3.listBuckets(function(err, res) {
          console.log(err||res)
        });
      },
      upload () {
        const res = this.$s3.getSignedUrl('putObject', {
          Body: this.myFile,
          Key: this.myFile.name,
          Bucket: "sopolyglot-dev"
        }, (err, data) => {
          if (err) {
              throw err;
          }
          console.log(data);
          this.returnedData = data
        })
      },
      fetch () {
        this.$s3.getSignedUrl('getObject', {
          Key: "FOHDL5PYLAI2PG9IX9VA",
          Bucket: "sopolyglot-dev"
        }, (err, data) => {
          if (err) {
              throw err;
          }
          console.log(data);
          this.returnedURL = data;
        });
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
