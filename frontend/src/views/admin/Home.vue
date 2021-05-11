<template>
  <div>
    <h2>
      Welcome back!
    </h2>

    <v-card>
      <v-card-title class="headline mb-1">
        Manage Requests & Complaints By Users
      </v-card-title>
      <v-card-text>
        Manage the refund requests and complaints by users and discount requests by instructors here.
        ( (?) Maybe pending refund requests and others' number could be displayed here
        but I did not add it here as we don't hold such an attribute in backend.)
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
            v-on:click="seeComplaints"
        >
          See Complaints
        </v-btn>
        <v-btn
            outlined
            text
            v-on:click="seeDiscountRequests"
        >
          See Discount Requests
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
          {{ refundReq.refundReason}}
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
        Pending Complaints By Students
      </h2>
      <v-card v-for="comp in complaintList" :key="comp.complaintId" outlined>
        <v-card-title>
          User: {{ comp.complainer }}
        </v-card-title>
        <v-card-text>
          {{ comp.complaint}}
        </v-card-text>
        <v-card-actions>
          <v-btn
              outlined
              text
              v-on:click="replyToComplaint (comp.complaintId)"
          >
            Reply To Student
          </v-btn>
          <v-btn
              outlined
              text
              v-on:click="dismissComplaint (comp.complaintId)"
          >
            Dismiss Complaint
          </v-btn>
        </v-card-actions>
      </v-card>
    </section>

    <section v-if="shownList === 3">
      <h2>
        Pending Discount Requests By Instructors
      </h2>
      <v-card v-for="discReq in discountReqList" :key="discReq.discReqId" outlined>
        <v-card-title>
          User: {{ discReq.instructor }}
        </v-card-title>
        <v-card-text>
          Course: {{ discReq.course}}
          Percentage: {{ discReq.percentage}}
        </v-card-text>
        <v-card-actions>
          <v-btn
              outlined
              text
              v-on:click="approveDiscount (discReq.discReqId)"
          >
            Approve Discount
          </v-btn>
          <v-btn
              outlined
              text
              v-on:click="rejectDiscount (discReq.discReqId)"
          >
            Reject Discount
          </v-btn>
        </v-card-actions>
      </v-card>
    </section>

    <section v-if="shownList === 4">
      <h3>
        Reply To {{ selectedComplaint.complainer}}
      </h3>
      <p>
        Complaint: {{ selectedComplaint.complaint }}
      </p>
      <textarea v-model="adminReplyText" placeholder="Write your reply here..."></textarea>
      <v-btn
          outlined
          text
          v-on:click="replyToStudentDueToComplaint"
      >
        Send Reply
      </v-btn>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // shownPart=1 -> show refund requests, shownPart=2 -> show complaints, shownPart=3-> show discount requests
      shownList: 0,
      adminReplyText: "",
      selectedComplaint: {
        complaintId: -1,
        complainer: "selected user",
        complaint: "selected complaint"
      },
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

      complaintList: [
        {
          complaintId: 1,
          complainer: "Example complainer 1",
          complaint: "Example complaint 1"
        },
        {
          complaintId: 2,
          complainer: "Example complainer 2",
          complaint: "Example complaint 2"
        },
        {
          complaintId: 3,
          complainer: "Example complainer 3",
          complaint: "Example complaint 3"
        }
      ],

      discountReqList: [
        {
          discReqId: 1,
          instructor: "Example instructor 1",
          course: "Example course 1",
          percentage: 15
        },
        {
          discReqId: 2,
          instructor: "Example instructor 2",
          course: "Example course 2",
          percentage: 20
        },
        {
          discReqId: 3,
          instructor: "Example instructor 3",
          course: "Example course 3",
          percentage: 50
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
    seeComplaints: function(){
      this.shownList = 2;
    },
    seeDiscountRequests: function(){
      this.shownList = 3;
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

    replyToComplaint: function( cId){
      // send reply to complaint
      // todo (db parts)
      // todo there is also an issue where the item is removed before the answer is sent
      // todo idk if we should change it such that after replying admin removes manually from the list

      this.shownList = 4;

      // remove from list
      let i;
      let selectedThreadIndex;
      for (i = 0; i < this.complaintList.length; i++) {
        if (this.complaintList[i].complaintId === cId) {
          selectedThreadIndex = i;
          this.selectedComplaint.complaint = this.complaintList[i].complaint;
          this.selectedComplaint.complainer = this.complaintList[i].complainer;
          this.selectedComplaint.complaintId = this.complaintList[i].complaintId;

        }
      }
      this.complaintList.splice(selectedThreadIndex, 1);
    },

    dismissComplaint: function( cId){
      // remove from list
      let i;
      let selectedThreadIndex;
      for (i = 0; i < this.complaintList.length; i++) {
        if (this.complaintList[i].complaintId === cId) {
          selectedThreadIndex = i;
        }
      }
      this.complaintList.splice(selectedThreadIndex, 1);
    },

    approveDiscount: function( dId){
      // process the changes to the price
      // todo

      // remove from list
      let i;
      let selectedThreadIndex;
      for (i = 0; i < this.discountReqList.length; i++) {
        if (this.discountReqList[i].discReqId === dId) {
          selectedThreadIndex = i;
        }
      }
      this.discountReqList.splice(selectedThreadIndex, 1);
    },

    rejectDiscount: function( dId){
      // remove from list
      let i;
      let selectedThreadIndex;
      for (i = 0; i < this.discountReqList.length; i++) {
        if (this.discountReqList[i].discReqId === dId) {
          selectedThreadIndex = i;
        }
      }
      this.discountReqList.splice(selectedThreadIndex, 1);
    },

    replyToStudentDueToComplaint(){
      // todo, move this message to student's inbox
      // the message: adminReplyText
      this.shownList = 2;
      // todo: after that, clear adminReplyText from the text-box
    }

  }

}
</script>

<style></style>
