<template>
  <v-container class="my-5">
    <v-layout row wrap justify-space-around mx-1 mb-5>
      <v-flex xs12 md6>
        <div class="d-flex align-center">
          <v-img
            alt="USAV Chesapeake Region Logo"
            class="shrink mr-2"
            contain
            :src="require('../assets/logo.gif')"
            transition="scale-transition"
            width="40"
          />
          <p>Chesapeake Region Head Referee Report</p>
        </div>
      </v-flex>
      <v-flex xs12 md6>
        <v-menu
          v-model="fromDateMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              label="Tournament Date"
              prepend-icon="mdi-calendar"
              readonly
              :value="fromDateDisp"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            locale="en-in"
            :min="minDate"
            v-model="fromDateVal"
            no-title
            @input="fromDateMenu = false"
          ></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
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
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md5 pt-2 mt-7>
        <v-slider
          v-model='noTeamRef4Count'
          thumb-label="always"
          :max=10
          :min=0
          label="No Refs on 3/4 Team Ct"
          hint="Indicate the number of teams without a refere on 3 or 4 team courts"
          dense
        ></v-slider>
      </v-flex>
      <v-flex xs12 md5 mt-7>
        <v-slider
          v-model='noTeamRef5Count'
          thumb-label="always"
          :max=10
          :min=0
          label="No Refs on 5 Team Ct"
          hint="Indicate the number of teams without a refere on 5 team courts"
        ></v-slider>
      </v-flex>
    </v-layout>
    <v-divider light></v-divider>
    <v-row align="center">
      <v-col class="d-flex" cols="35" sm="3">
        <v-text-field
          v-model="refereeName"
          ref="refereeName"
          label='Referee Name'
          value=''
          :counter="30"
          hint='Enter the name of a working referee'
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="35" sm="2">
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
      <v-col class="d-flex" cols="35" sm="2">
        <v-text-field
          v-model='evalCount'
          label='Evaluations'
          hint='Enter the number of evaluations'
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="25" sm="2">
        <v-text-field
          v-model='travelDistance'
          label='Travel Distance'
          hint='Enter the round trip distance traveled'
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="35" sm="3">
        <v-checkbox
          v-model='workedAllDay'
          label='Full day assignment'
          hint='Check the box if the referee worked a full day'
          dense
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="d-flex" cols="30" sm="1">
      </v-col>
      <v-col class="d-flex" cols="30" sm="3">
        <v-text-field
          v-model="setCount1"
          label='Number of 1 set matches'
          value=''
          hint='Num. 1 set matches worked'
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="30" sm="3">
        <v-text-field
          v-model="setCount2"
          label='Number of 2 set matches'
          value=''
          hint='Num. 2 set matches worked'
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="30" sm="3">
        <v-text-field
          v-model="setCount3"
          label='Number of 2/3, 3 set matches'
          value=''
          hint='Num. 2 out of 3 matches worked'
          dense
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="30" sm="2">
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
      <v-col cols="12" >
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
    <v-row class="mb-1" justify="center" v-if="minimumMatchFeeApplied">
      <v-col cols="12" text-xs-center>
        <div class="textred">* shows this referee will be paid the required minimum!</div>
      </v-col>
    </v-row>

    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md4>
        <hr>
        <div class="strong center">Tournament Overhead</div>
        <hr>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md4>
        <div class="dFlex">
          <div>No Ref (5 Teams): {{ noTeamRef5Count }} * {{ formatCurrency(noRef5) }}: </div>
          <div>{{ formatCurrency(noTeamRef5Count * noRef5) }}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md4>
        <div class="dFlex">
          <div>No Ref (3/4 Teams): {{ noTeamRef4Count }} * {{ formatCurrency(noRef4) }}: </div>
          <div>{{ formatCurrency(noTeamRef4Count * noRef4) }}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md4>
        <div class="dFlex">
          <div>Admin Fee: {{ numOfCourts }} Courts * {{ adminFee }}: </div>
          <div>{{ formatCurrency(numOfCourts * adminFee) }}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md4>
        <div class="dFlex">
          <div>Sanction Fee: {{ teamCount }} Teams * {{ sanctionFee }}: </div>
          <div>{{ formatCurrency(teamCount * sanctionFee) }}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md4>
        <hr>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md4>
        <div class="dFlex strong">
          <div>Tournament Overhead Total: </div>
          <div>{{ formatCurrency(cOverheadTotal) }}</div>
        </div>
      </v-flex>
    </v-layout>
    <br>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md4>
        <hr>
        <div class="strong center">Tournament Fees</div>
        <hr>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md4>
        <div class="dFlex">
          <div>Total Match Fees: </div>
          <div>{{ formatCurrency(matchFeeTotal) }}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md4>
        <div class="dFlex">
          <div>Total Travel Fees: </div>
          <div>{{ formatCurrency(totalTravelFee) }}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md4>
        <div class="dFlex">
          <div>Head Referee Fee: </div>
          <div>{{ formatCurrency(headRefFee) }}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md4>
        <hr>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-flex xs12 md4>
        <div class="dFlex strong">
          <div>Total Amount Due: </div>
          <div>{{ formatCurrency(cTotalDue) }}</div>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-around mx-1>
      <v-col class="d-flex mt-5" style="border: 1px solid black;" cols="12" text-xs-center>
        <v-textarea
          name="input-7-1"
          label="Notes:"
          value=""
          v-model="notes"
          hint="Put any notes you want to make in the report here."
        ></v-textarea>
      </v-col>
    </v-layout>
    <v-row class="mb-1 mt-4" justify="center" v-if="refereeDetails.length == numOfNprs">
      <v-btn
        v-on:click="savePdf"
        medium color="primary"
      >Download</v-btn>
    </v-row>
    <v-row class="mb-1" xs12 justify="center">
      <v-col class="d-flex" cols="12" text-xs-center>
        <div class="textblack">
          Download this completed page and e-mail the resulting PDF to the Tournament Director and reiko.allred@chrvavb.org<br>
          Note: A Download button will appear when the number of referees entered equals the Referee Count from above.
        </div>
      </v-col>
    </v-row>
    <v-row class="mb-1" xs12 justify="center">
      <v-col class="d-flex" cols="12" text-xs-center>
        <div class="textblack">
          If the tournament director gives you a check, mail it to<br>
          Treasurer CHRVA-AAVO<br>
          102 Sue Ann Ct<br>
          Sterling, VA 20164
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { APP_CONSTANTS, funcCreatePdf } from '../constants'
import JsPDF from 'jspdf'
export default {
  name: 'HelloWorld',

  data: () => ({
    adminFee: APP_CONSTANTS.adminFee,
    createPdf: funcCreatePdf,
    arrayRefereeCertifications: APP_CONSTANTS.arrayRefereeCertifications,
    overheadTotal: 0,
    matchFeeTotal: 0,
    totalTravelFee: 0,
    teamCount: 8,
    noTeamRef4Count: 0,
    noTeamRef5Count: 0,
    maxTeamCount: APP_CONSTANTS.maxTeamCount,
    tourneyType: APP_CONSTANTS.defTournamentType,
    sanctionFee: APP_CONSTANTS.defSanctionFee,
    numOfCourts: APP_CONSTANTS.defCourt,
    hrFee: APP_CONSTANTS.hrFee,
    maxCourtCount: APP_CONSTANTS.maxCourtCount,
    minNprCount: APP_CONSTANTS.minNprCount,
    maxNprCount: APP_CONSTANTS.maxNprCount,
    numOfNprs: APP_CONSTANTS.defNprCount,
    minCourtCount: APP_CONSTANTS.minCourtCount,
    noRef5: APP_CONSTANTS.noRef5,
    noRef4: APP_CONSTANTS.noRef4,
    playingLevel: '',
    notes: '',
    tournamentLocation: '',
    headRefereeName: '',
    refereeName: '',
    selectedRefRating: '',
    setCount1: 0,
    setCount2: 0,
    setCount3: 0,
    evalCount: 0,
    travelDistance: 0,
    workedAllDay: true,
    minimumMatchFeeApplied: false,
    headers: [
      { text: 'Referee', align: 'left', sortable: false, value: 'referee' },
      { text: 'Rating', align: 'center', sortable: false, value: 'rating' },
      { text: 'Evals', align: 'center', sortable: false, value: 'evalCount' },
      { text: '1 Set', align: 'center', sortable: false, value: 'setCount1' },
      { text: '2 Set', align: 'center', sortable: false, value: 'setCount2' },
      { text: '2/3, 3', align: 'center', sortable: false, value: 'setCount3' },
      { text: 'Full Day', align: 'center', sortable: false, value: 'wfDay' },
      { text: 'Match Fees', align: 'left', sortable: false, value: 'matchfeeStr' },
      { text: 'Travel Fee', align: 'left', sortable: false, value: 'travelFeeStr' },
      { text: 'Actions', align: 'center', sortable: false, value: 'action' }
    ],
    teamNoRef5: 0,
    teamNoRef4: 0,
    tempRefereeRating: '',
    refereeDetails: [],
    headRefFee: 6, // TODO this.hrFee.find(arr => arr.courts === this.numOfCourts).fee
    fromDateMenu: false,
    fromDateVal: APP_CONSTANTS.currentDate,
    minDate: '2019-07-04'
  }),
  methods: {
    saveRefereeRow: function (event) {
      var error = ''
      if (this.refereeName.length > 30) error += 'The referee name cannot be longer than 30 characters\n'
      if (isNaN(this.evalCount)) error += 'You must enter a number for the number of evaluations\n'
      if (isNaN(this.travelDistance)) error += 'You must enter a number for the travel distance\n'
      if (isNaN(this.setCount1)) error += 'You must enter a number for number of 1 set matches worked\n'
      if (isNaN(this.setCount2)) error += 'You must enter a number for number of 2 set matches worked\n'
      if (isNaN(this.setCount3)) error += 'You must enter a number for number of 2 of 3 set matches worked\n'
      if (error.length > 0) {
        alert('Sorry. Errors were found\n\n' + error)
        return false
      }
      const getInfo = this.arrayRefereeCertifications.find(type => type.type === this.tempRefereeRating)
      var matchFees = this.setCount1 * getInfo.one + this.setCount2 * getInfo.two + this.setCount3 * getInfo.twoOfThree || 0
      var minApplied = false
      if (this.workedAllDay && matchFees < getInfo.minimum) {
        matchFees = getInfo.minimum
        minApplied = true
      }
      var matchfeeStr = this.formatCurrency(matchFees)
      if (minApplied) matchfeeStr += ' *'
      var t = {
        'referee': this.refereeName,
        'setCount1': this.setCount1.length === 0 ? '0 @ ' + this.formatCurrency(getInfo.one) : this.setCount1 + ' @ ' + this.formatCurrency(getInfo.one),
        'set1': this.setCount1.length === 0 ? 0 : this.setCount1,
        'setCount2': this.setCount2.length === 0 ? '0 @ ' + this.formatCurrency(getInfo.two) : this.setCount2 + ' @ ' + this.formatCurrency(getInfo.two),
        'set2': this.setCount2.length === 0 ? 0 : this.setCount2,
        'setCount3': this.setCount3.length === 0 ? '0 @ ' + this.formatCurrency(getInfo.twoOfThree) : this.setCount3 + ' @ ' + this.formatCurrency(getInfo.twoOfThree),
        'set3': this.setCount3.length === 0 ? 0 : this.setCount3,
        'evalCount': this.evalCount.length === 0 ? 0 : this.evalCount,
        'rating': this.tempRefereeRating,
        'matchfeeStr': matchfeeStr,
        'matchfees': matchFees,
        'travelDistance': this.travelDistance,
        'wfDay': this.workedAllDay === true ? 'Yes' : 'No',
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
      this.travelDistance = 0
      this.workedAllDay = true
      this.computeTotals()
      this.$refs.refereeName.focus()
    },
    computeTotals: function () {
      this.matchFeeTotal = 0
      this.totalTravelFee = 0
      this.minimumMatchFeeApplied = false
      for (var i = 0; i < this.refereeDetails.length; i++) {
        if (this.refereeDetails[i].matchfeeStr.indexOf('*') >= 0) this.minimumMatchFeeApplied = true
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
      this.refereeName = item.referee
      this.setCount1 = item.set1
      this.setCount2 = item.set2
      this.setCount3 = item.set3
      this.evalCount = item.evalCount
      this.selectedRefRating = item.rating
      this.travelDistance = item.travelDistance
      this.workedAllDay = true
      if (item.wfDay === 'No') this.workedAllDay = false
      var loc = this.refereeDetails.findIndex(x => x.referee === item.referee && x.rating === item.rating)
      this.refereeDetails.splice(loc, 1)
      this.computeTotals()
    },
    /* test () {
      console.log('nav')
      this.$router.push('about')
    }, */
    savePdf () {
      var doc = new JsPDF({
        format: 'letter'
        // , orientation: 'l'
      })
      this.createPdf(doc, {
        title: 'CHRVA Head Referee Report',
        tournamentDate: this.fromDateDisp,
        playlingLevel: this.playingLevel,
        tournamentLocation: this.tournamentLocation,
        headRefereeName: this.headRefereeName,
        numOfNprs: this.numOfNprs,
        teamCount: this.teamCount,
        numOfCourts: this.numOfCourts,
        noTeamRef5Count: this.noTeamRef5Count,
        noTeamRef4Count: this.noTeamRef4Count,
        refereeDetails: this.refereeDetails,
        adminFee: this.formatCurrency(this.numOfCourts * this.adminFee),
        sanctionFee: this.formatCurrency(this.teamCount * this.sanctionFee),
        noRef5: this.formatCurrency(this.noRef5 * this.noTeamRef5Count),
        noRef4: this.formatCurrency(this.noRef4 * this.noTeamRef4Count),
        matchFeeTotal: this.formatCurrency(this.matchFeeTotal),
        totalTravelFee: this.formatCurrency(this.totalTravelFee),
        headRefFee: this.formatCurrency(this.headRefFee),
        notes: this.notes,
        totalDue: this.formatCurrency(this.cTotalDue),
        minimumMatchFeeApplied: this.minimumMatchFeeApplied
      })
    }
  },
  computed: {
    cOverheadTotal () {
      return this.numOfCourts * this.adminFee + this.teamCount * this.sanctionFee +
        this.noTeamRef5Count * this.noRef5 + this.noTeamRef4Count * this.noRef4
    },
    cTournamentTotal () {
      return this.matchFeeTotal + this.totalTravelFee + this.headRefFee
    },
    cTotalDue () {
      return this.cTournamentTotal + this.cOverheadTotal
    },
    cHeadRefFee () { return this.hrFee.find(arr => arr.courts === this.numOfCourts).fee },
    fromDateDisp () {
      return this.fromDateVal.substr(5, 5) + '-' + this.fromDateVal.substr(0, 4)
    }
  },
  watch: {
    selectedRefRating (val) {
      this.tempRefereeRating = val
    },
    numOfCourts (val) {
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
  .redNoBorder{
    color: red;
  }
  .textblack{
    text-align: center;
    border: 1px solid black;
    width: 100%;
    margin-top: 10px;
    /*height: 160px;
    /*line-height: 50px;*/
  }
  .dFlex{
    display: flex;
    width: 400px;
    /*border: 1px solid blue;/**/
  }
  .dFlex > div:first-child{
    white-space: nowrap;
    width: 250px;/**/
    /*border: 1px solid red;/**/
  }
  .dFlex > div:last-child{
    width: 125px;
    text-align: left;
    /*border: 1px solid green;/**/
  }
  .strong {
    font-weight: bold;
  }
  .center{
    text-align: center
  }
</style>
