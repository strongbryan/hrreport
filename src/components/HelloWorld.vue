<template>
  <v-container class="my-5">
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md3>
        <v-text-field
          v-model='playingLevel'
          label='Playing Level'
          value=''
          hint='e.g. Junior Girls, 14 Open'
          dense
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md3>
        <v-text-field
          v-model='tournamentLocation'
          label='Tournament Location'
          value=''
          hint='Enter the gym name, city and state of the tournament'
          dense
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md3>
        <v-text-field
          v-model='headRefereeName'
          label="Head Referee's Name"
          value=''
          hint=""
          dense
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md3 pt-2 mt-7>
        <v-slider
          v-model='numOfNprs'
          thumb-label="always"
          :max=maxNprCount
          :min=minNprCount
          label="Referee Count"
          hint="Indicate the number of NPRs working"
          dense
        ></v-slider>
      </v-flex>
      <v-flex xs12 md3 pt-2 mt-7>
        <v-slider
          v-model='teamCount'
          thumb-label="always"
          :max=maxTeamCount
          :min=3
          label="Team Count"
          hint="Indicate the number of teams in the tournament"
          dense
        ></v-slider>
      </v-flex>
      <v-flex xs12 md3 mt-7>
        <v-slider
          v-model='numOfCourts'
          thumb-label="always"
          :max=maxCourtCount
          :min=minCourtCount
          label="Court Count"
          hint="Indicate the number of courts being reported"
        ></v-slider>
      </v-flex>
    </v-layout>
    <v-divider light></v-divider>
    <v-row align="center">
      <v-col class="d-flex" cols="40" sm="3">
        <v-text-field
          v-model="refereeName"
          label='Referee Name'
          value=''
          hint='Enter the name of a working referee'
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="40" sm="3">
        <v-select
          v-model='selectedRefRating'
          :items="arrayRefereeCertifications"
          item-text="display"
          item-value="type"
          label="Referee Type"
          width="50"
          dense
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="40" sm="3">
        <v-text-field
          v-model='evalCount'
          label='Evaluations'
          hint='Enter the number of evaluations'
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="40" sm="3">
        <v-text-field
          v-model='travelDistance'
          label='Travel Distance'
          hint='Enter the round trip distance traveled'
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="d-flex" cols="40" sm="4">
        <v-text-field
          v-model="setCount1"
          label='Number of 1 set matches'
          value=''
          hint='Num. 1 set matches worked'
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="40" sm="4">
        <v-text-field
          v-model="setCount2"
          label='Number of 2 set matches'
          value=''
          hint='Num. 2 set matches worked'
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="40" sm="4">
        <v-text-field
          v-model="setCount3"
          label='Number of 2/3, 3 set matches'
          value=''
          hint='Num. 2 out of 3 matches worked'
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mb-1" justify="center">
      <v-col cols="2">
        <v-btn
          v-on:click="saveRefereeRow"
          medium color="primary"
          :disabled="refereeName === '' || travelDistance === '' || selectedRefRating === '' || (setCount1 == 0 && setCount2 == 0 && setCount3 == 0)"
        >Add Ref</v-btn>
      </v-col>
    </v-row>
    <v-row class="mb-1" justify="center">
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="refereeDetails"
          :items-per-page="15"
          class="elevation-1"
        >
          <template v-slot:item.action="{ item }">
            <v-icon small @click="editRef(item)" title='Edit referee - click ADD when done'>mdi-border-color</v-icon>
            <v-icon small @click="deleteRef(item)" title='Delete this referee'>mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-row class="mb-1" justify="center" v-if="refereeDetails.length < numOfNprs">
      <v-col class="d-flex" cols="12" text-xs-center>
        <div class="textred">NOT ENOUGH REFEREES REPORTED</div>
      </v-col>
    </v-row>
    <v-row class="mb-1" justify="center" v-if="refereeDetails.length > numOfNprs">
      <v-col cols="12" text-xs-center>
        <div class="textred">TOO MANY REFEREES REPORTED!</div>
      </v-col>
    </v-row>

    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md3>
        <hr>
        <div class="strong">Tournament Overhead</div>
        <hr>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs4 md3>
        <div class="dFlex">
          <div>Admin Fee: {{ numOfCourts }} Cts * {{ formatCurrency(adminFee) }}:</div>
          <div>{{ formatCurrency(numOfCourts * adminFee) }}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs4 md3>
        <div class="dFlex">
          <div>Sanction Fee: {{ teamCount }} Teams * {{ sanctionFee }}:</div>
          <div>{{ formatCurrency(teamCount * sanctionFee) }}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md3>
        <hr>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs4 md3>
        <div class="dFlex strong">
          <div>Tournament Overhead Total:</div>
          <div>{{ formatCurrency(cOverheadTotal) }}</div>
        </div>
      </v-flex>
    </v-layout>
    <br>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md3>
        <hr>
        <div class="strong">Tournament Fees</div>
        <hr>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs4 md3>
        <div class="dFlex">
          <div>Total Match Fees: </div>
          <div>{{ formatCurrency(matchFeeTotal) }}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs4 md3>
        <div class="dFlex">
          <div>Total Travel Fees: </div>
          <div>{{ formatCurrency(totalTravelFee) }}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs4 md3>
        <div class="dFlex">
          <div>Head Referee Fee: </div>
          <div>{{ formatCurrency(headRefFee) }}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md3>
        <hr>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs4 md3>
        <div class="dFlex strong">
          <div>Total Amount Due: </div>
          <div>{{ formatCurrency(cTotalDue) }}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-row class="mb-1" justify="center">
      <v-col class="d-flex" cols="12" text-xs-center>
        <div class="textblack">
          Save this completed page as a PDF and e-mail it to the Tournament Director and fred.mehl@chrva.org<br>
          <div class="instructorFlex">
            <div><a href="https://www.techrepublic.com/article/how-to-save-a-website-as-a-pdf-in-android-chrome/" target="_blank">Android instructions to save this page as a PDF</a></div>
            <div>
              iPhone instructions (iOS 13)
              <ol>
                <li>In Safari, complete the form.</li>
                <li>Tap the Share button (square with an up arrow at the bottom of the window)</li>
                <li>In the pop-up, find and tap Books. If Books is not a preferred or normal method, tap MORE to find it</li>
                <li>The web page will save automagically to the Books App</li>
                <li>While still in Books, Tap the Share button at the top, and tap your email client/provider</li>
              </ol>
            </div>
          </div>
            <br>
        </div>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { APP_CONSTANTS } from '../constants'
export default {
  name: 'HelloWorld',

  data: () => ({
    adminFee: APP_CONSTANTS.adminFee,
    arrayRefereeCertifications: APP_CONSTANTS.arrayRefereeCertifications,
    overheadTotal: 0,
    matchFeeTotal: 0,
    totalTravelFee: 0,
    teamCount: 8,
    maxTeamCount: APP_CONSTANTS.maxTeamCount,
    tourneyType: APP_CONSTANTS.defTournamentType,
    sanctionFee: APP_CONSTANTS.defSanctionFee,
    numOfCourts: APP_CONSTANTS.defCourt,
    // headRefFee: 0,
    hrFee: APP_CONSTANTS.hrFee,
    maxCourtCount: APP_CONSTANTS.maxCourtCount,
    minNprCount: APP_CONSTANTS.minNprCount,
    maxNprCount: APP_CONSTANTS.maxNprCount,
    numOfNprs: APP_CONSTANTS.defNprCount,
    minCourtCount: APP_CONSTANTS.minCourtCount,
    playingLevel: '',
    tournamentLocation: '',
    headRefereeName: '',
    refereeName: '',
    selectedRefRating: '',
    setCount1: 0,
    setCount2: 0,
    setCount3: 0,
    evalCount: 0,
    travelDistance: 0,
    headers: [
      { text: 'Referee', align: 'left', sortable: false, value: 'referee' },
      { text: 'Rating', align: 'center', sortable: false, value: 'rating' },
      { text: 'Evals', align: 'center', sortable: false, value: 'evalCount' },
      { text: '1 Set', align: 'center', sortable: false, value: 'setCount1' },
      { text: '2 Set', align: 'center', sortable: false, value: 'setCount2' },
      { text: '2/3, 3', align: 'center', sortable: false, value: 'setCount3' },
      { text: 'Match Fees', align: 'left', sortable: false, value: 'matchfeeStr' },
      { text: 'Travel Fee', align: 'left', sortable: false, value: 'travelFeeStr' },
      { text: 'Actions', align: 'center', sortable: false, value: 'action' }
    ],
    teamNoRef5: 0,
    teamNoRef4: 0,
    tempRefereeRating: '',
    refereeDetails: [],
    headRefFee: 6 // TODO this.hrFee.find(arr => arr.courts === this.numOfCourts).fee
  }),
  methods: {
    saveRefereeRow: function (event) {
      const getInfo = this.arrayRefereeCertifications.find(type => type.type === this.tempRefereeRating)
      var matchFees = this.setCount1 * getInfo.one + this.setCount2 * getInfo.two + this.setCount3 * getInfo.twoOfThree || 0
      var t = {
        'referee': this.refereeName,
        'setCount1': this.setCount1 + ' @ ' + this.formatCurrency(getInfo.one),
        'set1': this.setCount1,
        'setCount2': this.setCount2 + ' @ ' + this.formatCurrency(getInfo.two),
        'set2': this.setCount2,
        'setCount3': this.setCount3 + ' @ ' + this.formatCurrency(getInfo.twoOfThree),
        'set3': this.setCount3,
        'evalCount': this.evalCount,
        'rating': this.tempRefereeRating,
        'matchfeeStr': this.formatCurrency(matchFees),
        'matchfees': matchFees,
        'travelDistance': this.travelDistance,
        'travelFeeStr': this.formatCurrency(this.travelDistance * APP_CONSTANTS.travelRate),
        'travelFee': this.travelDistance * APP_CONSTANTS.travelRate
      }
      this.refereeDetails.unshift(t)
      this.refereeName = ''
      this.setCount1 = 0
      this.setCount2 = 0
      this.setCount3 = 0
      this.evalCount = 0
      this.selectedRefRating = ''
      this.travelDistance = '0'
      this.computeTotals()
    },
    computeTotals: function () {
      this.matchFeeTotal = 0
      this.totalTravelFee = 0
      for (var i = 0; i < this.refereeDetails.length; i++) {
        this.matchFeeTotal += this.refereeDetails[i].matchfees
        this.totalTravelFee += this.refereeDetails[i].travelFee
      }
    },
    formatCurrency: function (num) {
      num = num.toString().replace(/\$|,/g, '')
      if (isNaN(num)) {
        num = '0'
      }
      // let sign = (num === (num = Math.abs(num)))
      let sign = true
      if (num < 0) sign = false
      num = Math.floor(num * 100 + 0.50000000001)
      let cents = num % 100
      num = Math.floor(num / 100).toString()
      if (cents < 10) {
        cents = '0' + cents
      }
      for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3))
      }
      return (((sign) ? '' : '-') + '$' + num + '.' + cents)
    },
    deleteRef (item) {
      var loc = this.refereeDetails.findIndex(x => x.referee === item.referee && x.rating === item.rating)
      if (loc > -1 && confirm('Are you sure you want to delete this referee?')) {
        this.refereeDetails.splice(loc, 1)
      }
      this.computeTotals()
    },
    editRef (item) {
      console.log(item)
      this.refereeName = item.referee
      this.setCount1 = item.set1
      this.setCount2 = item.set2
      this.setCount3 = item.set3
      this.evalCount = item.evalCount
      this.selectedRefRating = item.rating
      this.travelDistance = item.travelDistance
      var loc = this.refereeDetails.findIndex(x => x.referee === item.referee && x.rating === item.rating)
      this.refereeDetails.splice(loc, 1)
      this.computeTotals()
    }
  },
  computed: {
    cOverheadTotal () { return this.numOfCourts * this.adminFee + this.teamCount * this.sanctionFee },
    cTournamentTotal () {
      return this.matchFeeTotal + this.totalTravelFee + this.headRefFee
    },
    cTotalDue () {
      return this.cTournamentTotal + this.cOverheadTotal
    },
    cHeadRefFee () { return this.hrFee.find(arr => arr.courts === this.numOfCourts).fee }
  },
  watch: {
    selectedRefRating (val) {
      this.tempRefereeRating = val
    },
    numOfCourts (val) {
      console.log()
      this.headRefFee = this.hrFee.find(arr => arr.courts === val).fee
    }
  }
}
</script>

<style>
  .textred{
    color: red;
    text-align: center;
    border: 1px solid red;
    width: 100%
  }
  .textblack{
    text-align: center;
    border: 1px solid black;
    width: 100%;
    margin-top: 80px;
    /*height: 160px;
    /*line-height: 50px;*/
  }
  .dFlex{
    display: flex;
  }
  .dFlex > div:first-child{
    white-space: nowrap;
    width: 450px;
    /*border: 1px solid red;/**/
  }
  .dFlex > div:last-child{
    width: 150px;
    text-align: left;
    /*border: 1px solid green;/**/
  }
  .instructorFlex{
    display: flex;
  }
  .instructorFlex > div:first-child{
    width: 50%;
    /*border: 1px solid red;/**/
  }
  .instructorFlex > div:last-child{
    text-align: left;
    width: 50%;
    /*border: 1px solid green;/**/
  }
  .strong {
    font-weight: bold;
  }
</style>
