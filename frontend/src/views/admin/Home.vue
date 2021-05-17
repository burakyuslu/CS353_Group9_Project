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
        Manage the refund requests by users here. Adjust which courses are
        discounted.
      </v-card-text>
      <v-card-actions>
        <v-btn outlined text v-on:click="seeRefundRequests">
          See Refund Requests
        </v-btn>
        <v-btn outlined text v-on:click="seeDiscountsPanel">
          Open Discounts Panel
        </v-btn>
      </v-card-actions>
    </v-card>

    <section v-if="shownList === 1">
      <h2>
        Pending Refund Requests By Students
      </h2>
      <v-card v-for="(refundReq, i) in refundReqList" :key="i">
        <v-card-title> User: {{ refundReq.student_id }} </v-card-title>
        <v-card-text>
          {{ refundReq.reason }}
        </v-card-text>
        <v-card-text>
          test
        </v-card-text>
        <v-card-actions>
          <v-btn outlined text v-on:click="approveRefund(refundReq.request_id)">
            Approve Refund
          </v-btn>
          <v-btn outlined text v-on:click="rejectRefund(refundReq.request_id)">
            Reject Refund
          </v-btn>
        </v-card-actions>
      </v-card>
    </section>

    <section v-if="shownList === 2">
      <h2>
        Adjust the Discount Rate For Different Courses
      </h2>
      <v-card v-for="(disc, i) in discountableList" :key="i">
        <v-card-title> Course: {{ disc.course_id }} </v-card-title>
        <v-card-text>
          Current Discount Percentage: {{ disc.percentage }}
        </v-card-text>
        <v-card-actions>
          <input
            v-model="disc.percentage"
            placeholder="new discount percentage"
          />
          <v-btn
            outlined
            text
            v-on:click="setDiscount(disc.percentage, disc.course_id)"
          >
            Set Discount As Entered
          </v-btn>
          <v-btn outlined text v-on:click="setDiscount(0, disc.course_id)">
            Cancel Discounts
          </v-btn>
        </v-card-actions>
      </v-card>
    </section>
  </div>
</template>

<script>
import axios from '../../utils/config.js'

export default {
  components: {},
  data() {
    return {
      // shownPart=1 -> show refund requests, shownPart=2 -> show discount panel
      shownList: 0,
      adminReplyText: '',
      refundReqList: [],
      discountableList: [],
      newPercentage: 0,
    }
  },
  computed: {},
  async mounted() {
    const response1 = await axios.get('request/listRefundRequests', {
      params: {
        admin_id: 1,
      },
    })
    this.refundReqList = response1.data

    const response2 = await axios.get('discount/listDiscountableCourses', {
      params: {
        admin_id: 1,
      },
    })
    this.discountableList = response2.data
  },
  methods: {
    seeRefundRequests: async function() {
      // TODO CHECk i have literally 0 idea if this is correct, at all
      // let refundRequestsArr = await axios.get( '/v1/request/listRefundRequests');
      // console.log(refundRequestArr);
      // this.refundReqList = refundRequestArr; // do we initialize its properties inside a for loop
      // or do we just do it plainly like this

      this.shownList = 1
    },
    seeDiscountsPanel: function() {
      this.shownList = 2
    },

    approveRefund: function(refId) {
      // process refund
      // todo

      // remove from list
      let i
      let selectedThreadIndex
      for (i = 0; i < this.refundReqList.length; i++) {
        if (this.refundReqList[i].refundReqId === refId) {
          selectedThreadIndex = i
        }
      }
      this.refundReqList.splice(selectedThreadIndex, 1)
    },

    rejectRefund: function(refId) {
      // remove from list
      let i
      let selectedThreadIndex
      for (i = 0; i < this.refundReqList.length; i++) {
        if (this.refundReqList[i].refundReqId === refId) {
          selectedThreadIndex = i
        }
      }
      this.refundReqList.splice(selectedThreadIndex, 1)
    },

    setDiscount: async function(newPercentage, course_id) {
      try {
        await axios.post('discount/applyDiscount', {
          percentage: newPercentage,
          course_id: course_id,
        })
        const response1 = await axios.get('request/listRefundRequests', {
          params: {
            admin_id: 1,
          },
        })
        this.refundReqList = response1.data

        const response2 = await axios.get('discount/listDiscountableCourses', {
          params: {
            admin_id: 1,
          },
        })
        this.discountableList = response2.data
      } catch (exception) {
        console.log(exception)
      }
    },
  },
}
</script>

<style></style>
