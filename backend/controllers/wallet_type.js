const walletTypes = [
    {id: 1, name:"deposit", lable:"Deposit"},
    {id: 2, name:"withdraw", lable:"Withdraw"},
    {id: 3, name:"Bid_place", lable:"Bid Place"},
    {id: 4, name:"Bid_Won", lable:"Bid Won"},
    {id: 5, name:"Bounce", lable:"Bounce"}
];

const statusTypes = [
    {id: 1, name:"pending", lable:"Pending"},
    {id: 2, name:"completed", lable:"Completed"},
    {id: 3, name:"cancelled", lable:"Cancelled"}
]


const getWalletTypes = async (req, res) => {
   
        res.json({ data: walletTypes });
    
};
   

const getStatusTypes = async (req, res) => {    
    res.json({ data: statusTypes });
}

module.exports = { getWalletTypes, getStatusTypes };