export const APP_CONSTANTS = {
  currentDate: (new Date()).getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
  adminFee: 30,
  arrayRefereeCertifications: [
    { 'type': 'N', 'display': 'National', 'one': 15.5, 'two': 31.5, 'twoOfThree': 36.5, 'minimum': 170 },
    { 'type': 'JN', 'display': 'Junior National', 'one': 15.5, 'two': 31.5, 'twoOfThree': 36.5, 'minimum': 170 },
    { 'type': 'R', 'display': 'Regional', 'one': 15.5, 'two': 30.5, 'twoOfThree': 35.5, 'minimum': 165 },
    { 'type': 'P', 'display': 'Provisional', 'one': 15.5, 'two': 25.5, 'twoOfThree': 30.5, 'minimum': 140 }
  ],
  defCourt: 2,
  defNprCount: 2,
  defTournamentType: 'Junior',
  defSanctionFee: 7,
  maxCourtCount: 10,
  minCourtCount: 1,
  defCourtCount: 2,
  maxNprCount: 20,
  maxTeamCount: 50,
  minNprCount: 1,
  travelRate: 0.3,
  noRef4: 42.5,
  noRef5: 52.5,
  hrFee: [
    { 'courts': 1, 'fee': 3 },
    { 'courts': 2, 'fee': 6 },
    { 'courts': 3, 'fee': 9 },
    { 'courts': 4, 'fee': 13 },
    { 'courts': 5, 'fee': 17 },
    { 'courts': 6, 'fee': 21 },
    { 'courts': 7, 'fee': 30 },
    { 'courts': 8, 'fee': 40 },
    { 'courts': 9, 'fee': 55 },
    { 'courts': 10, 'fee': 70 }
  ]
}

export function funcCreatePdf (doc, args) {
  var lineStart = 20
  var pdfName = 'HR_Report' + this.fromDateDisp
  const lineHeight = 7
  const lineLength = 180
  function checkLine (lineAdd) {
    if (lineStart > 240) {
      lineStart = 20
      doc.addPage()
    } else {
      lineStart += lineAdd
    }
  }
  doc.text(args.title, 105, lineStart, null, null, 'center')
  doc.setFontSize(12)
  lineStart += 20
  doc.text('Tournament Date: ' + args.tournamentDate, 20, lineStart)
  checkLine (lineHeight)
  doc.text('Playing Level: ' + args.playlingLevel, 20, lineStart)
  checkLine (lineHeight)
  doc.text('Tournament Location: ' + args.tournamentLocation, 20, lineStart)
  checkLine (lineHeight)
  doc.text('Head Referee Name: ' + args.headRefereeName, 20, lineStart)
  checkLine (lineHeight)
  doc.text('Referee Count: ' + args.numOfNprs, 20, lineStart)
  checkLine (lineHeight)
  doc.text('Team Count: ' + args.teamCount, 20, lineStart)
  checkLine (lineHeight)
  doc.text('Court Count: ' + args.numOfCourts, 20, lineStart)
  checkLine (lineHeight)
  doc.text('Teams with no referee on a 5 team court: ' + args.noTeamRef5Count, 20, lineStart)
  checkLine (lineHeight)
  doc.text('Teams with no referee on a 3 or 4 team court: ' + args.noTeamRef4Count, 20, lineStart)
  checkLine (lineHeight * 2)
  if (args.minimumMatchFeeApplied) {
    doc.text('Referees with an asterisk next to match pay are getting the minimum amount.', 20, lineStart)
    checkLine (lineHeight * 2)
  }
  for (var i = 0; i < args.refereeDetails.length; i++) {
    var t = 'Referee: ' + args.refereeDetails[i].referee + ' (' + args.refereeDetails[i].rating + ') '
    t += args.refereeDetails[i].setCount1 + ' '
    t += args.refereeDetails[i].setCount2 + ' '
    t += args.refereeDetails[i].setCount3 + ' '
    t += 'Match total: ' + args.refereeDetails[i].matchfeeStr
    doc.text(t, 20, lineStart)
    checkLine (lineHeight)
    t = 'Travel Dist: ' + args.refereeDetails[i].travelDistance + 'm '
    t += 'Travel Fee: ' + args.refereeDetails[i].travelFeeStr + ' '
    t += 'Evaluation Count: ' + args.refereeDetails[i].evalCount + ' '
    doc.text(t, 30, lineStart)
    checkLine (lineHeight)
  }
  doc.text('Tournament Overhead', 105, lineStart, null, null, 'center')
  checkLine (lineHeight)
  doc.line(20, lineStart, lineLength, lineStart)
  checkLine (lineHeight)
  doc.text('Admin Fee: ' + args.adminFee, 20, lineStart)
  checkLine (lineHeight)
  doc.text('Sanction Fee: ' + args.sanctionFee, 20, lineStart)
  checkLine (lineHeight)
  doc.text('Teams with no referee on a 5 team court: ' + args.noRef5, 20, lineStart)
  checkLine (lineHeight)
  doc.text('Teams with no referee on a 3 or 4 team court: ' + args.noRef4, 20, lineStart)
  checkLine (lineHeight)
  doc.text('Total Match Fees: ' + args.matchFeeTotal, 20, lineStart)
  checkLine (lineHeight)
  doc.text('Total Travel Fees: ' + args.totalTravelFee, 20, lineStart)
  checkLine (lineHeight)
  doc.text('Head Referee Fee: ' + args.headRefFee, 20, lineStart)
  checkLine (lineHeight)
  doc.line(20, lineStart, lineLength, lineStart)
  checkLine (lineHeight)
  doc.text('Notes: ', 20, lineStart)
  checkLine (lineHeight)
  var splitNotes = doc.splitTextToSize(args.notes, 180)
  doc.text(splitNotes, 20, lineStart)
  checkLine (lineHeight * 2)
  doc.line(20, lineStart, lineLength, lineStart)
  checkLine (lineHeight)
  doc.text('Total Amount Due: ' + args.totalDue, 105, lineStart, null, null, 'center')

  doc.save(pdfName + '.pdf')
}
