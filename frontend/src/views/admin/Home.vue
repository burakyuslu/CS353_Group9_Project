<template>
  <div>
    <h2>
      Welcome back!
    </h2>

    <v-card>
      <v-card-title class="headline mb-1">
        Manage Refund Requests & Discounts
      </v-card-title>
      <v-card-text>
        Manage the refund requests by users here.
        Adjust which courses are discounted.
      </v-card-text>
      <v-card-actions>
        <v-btn
            outlined
            text
            v-on:click="seeRefundRequests"
        >
          See Refund Requests
        </v-btn>
        <v-btn
            outlined
            text
            v-on:click="seeDiscountsPanel"
        >
          Open Discounts Panel
        </v-btn>
      </v-card-actions>
    </v-card>

    <section v-if="shownList === 1">
      <h2>
        Pending Refund Requests By Students
      </h2>
      <v-card v-for="(refundReq, i) in refundReqList" :key="i">
        <v-card-title>
          User: {{ refundReq.student_id }}
        </v-card-title>
        <v-card-text>
          {{ refundReq.reason }}
        </v-card-text>
        <v-card-text>
          test
        </v-card-text>
        <v-card-actions>
          <v-btn
              outlined
              text
              v-on:click="approveRefund (refundReq.request_id)"
          >
            Approve Refund
          </v-btn>
          <v-btn
              outlined
              text
              v-on:click="rejectRefund (refundReq.request_id)"
          >
            Reject Refund
          </v-btn>
        </v-card-actions>
      </v-card>
    </section>

    <section v-if="shownList === 2">
      <h2>
        Adjust the Discount Rate For Different Courses
      </h2>
      <v-card v-for="disc in discountableList" :key="disc.courseId" outlined>
        <v-card-title>
          Course: {{ disc.course}}
        </v-card-title>
        <v-card-text>
          Instructor: {{ disc.instructor }}
          Current Discount Percentage: {{ disc.percentage}}
        </v-card-text>
        <v-card-actions>
          <input v-model="disc.discPercentageNew" placeholder="new discount percentage">
          <v-btn
              outlined
              text
              v-on:click="setDiscount (disc)"
          >
            Set Discount As Entered
          </v-btn>
          <v-btn
              outlined
              text
              v-on:click="cancelDiscount (disc)"
          >
            Cancel Discounts
          </v-btn>
        </v-card-actions>
      </v-card>
    </section>
    <pre>
      {{refundReqList}}
    </pre>
  </div>
</template>

<script>
import axios from '../../utils/config.js';

export default {
  components: {},
  data() {
    return {
      // shownPart=1 -> show refund requests, shownPart=2 -> show discount panel
      shownList: 0,
      adminReplyText: "",
      refundReqList: [],
      discountableList: [
        {
          courseId: 1,
          instructor: "Example instructor 1",
          course: "Example course 1",
          percentage: 0
        },
        {
          courseId: 2,
          instructor: "Example instructor 2",
          course: "Example course 2",
          percentage: 15
        },
        {
          courseId: 3,
          instructor: "Example instructor 3",
          course: "Example course 3",
          percentage: 0
        }
      ],

    };
  },
  computed: {

  },
  async mounted() {
    const response = await axios.get('request/listRefundRequests' ,{
      params: {
        admin_id : 1
      }
    });
    this.refundReqList = response.data
  },
  methods: {


    seeRefundRequests: async function(){

      // TODO CHECk i have literally 0 idea if this is correct, at all
      // let refundRequestsArr = await axios.get( '/v1/request/listRefundRequests');
      // console.log(refundRequestArr);
      // this.refundReqList = refundRequestArr; // do we initialize its properties inside a for loop
      // or do we just do it plainly like this

      this.shownList = 1;
    },
    seeDiscountsPanel: function(){
      this.shownList = 2;
    },

    approveRefund: function( refId){
      // process refund
      // todo

      // remove from list
      let i;
      let selectedThreadIndex;
      for (i = 0; i < this.refundReqList.length; i++) {
        if (this.refundReqList[i].refundReqId === refId) {
          selectedThreadIndex = i;
        }
      }
      this.refundReqList.splice(selectedThreadIndex, 1);
    },

    rejectRefund: function( refId){
      // remove from list
      let i;
      let selectedThreadIndex;
      for (i = 0; i < this.refundReqList.length; i++) {
        if (this.refundReqList[i].refundReqId === refId) {
          selectedThreadIndex = i;
        }
      }
      this.refundReqList.splice(selectedThreadIndex, 1);
    },

    setDiscount: function( disc) {
      if (disc.discPercentageNew === ''){
        alert( "Error: Discount percentage cannot be set to empty!");
      }
      else{
        disc.percentage = disc.discPercentageNew;
      }
    },

    cancelDiscount: function(disc){
      disc.percentage = 0;
    }
  }
}
</script>

<style></style>
