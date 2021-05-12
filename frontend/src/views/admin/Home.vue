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
      <v-card v-for="refundReq in refundReqList" :key="refundReq.refundReqId" outlined>
        <v-card-title>
          User: {{ refundReq.requester }}
        </v-card-title>
        <v-card-text>
          {{ refundReq.refundReason }}
        </v-card-text>
        <v-card-actions>
          <v-btn
              outlined
              text
              v-on:click="approveRefund (refundReq.refundReqId)"
          >
            Approve Refund
          </v-btn>
          <v-btn
              outlined
              text
              v-on:click="rejectRefund (refundReq.refundReqId)"
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
        </v-card-actions>
      </v-card>
    </section>

  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // shownPart=1 -> show refund requests, shownPart=2 -> show discount panel
      shownList: 0,
      adminReplyText: "",
      refundReqList: [
        {
          refundReqId: 1,
          requester: "Example refunder 1",
          refundReason: "Example reason 1"
        },
        {
          refundReqId: 2,
          requester: "Example refunder 2",
          refundReason: "Example reason 2"
        },
        {
          refundReqId: 3,
          requester: "Example refunder 3",
          refundReason: "Example reason 3"
        }
      ],
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
  methods: {
    seeRefundRequests: function(){
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

    disc.percentage = disc.discPercentageNew;
//      let i;
//      for( i = 0; i < this.discountableList.length; i++){
//        if( this.discountableList[i] === coId){
//          this.discountableList[i].percentage = this.discountableList[i].discPercentageNew;
//        }
//
//      }
    },
  }
}
</script>

<style></style>
