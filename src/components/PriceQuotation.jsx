import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, IconButton } from '@mui/material';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  gstin: {
    fontSize: 10,
    marginBottom: 5,
  },
  companyName: {
    fontSize: 24,
    color: '#C71585',
    marginBottom: 10,
    textAlign: 'center',
  },
  services: {
    fontSize: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  address: {
    fontSize: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
  quotationTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  workTitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#4B0082',
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
  },
  tableCol: {
    width: '20%',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderRightStyle: 'solid',
  },
  tableColDescription: {
    width: '40%',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderRightStyle: 'solid',
  },
  bankingDetails: {
    marginTop: 20,
    fontSize: 10,
  },
  gstNote: {
    marginTop: 10,
    fontSize: 10,
    fontStyle: 'italic',
  }
});

// PDF Document Component
const QuotationPDF = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.gstin}>GSTIN : 08AJEPL2190F1ZC</Text>
        <Text style={styles.gstin}>State Code - 08</Text>
        <Text style={styles.companyName}>Jagdamba Refrigeration</Text>
        <Text style={styles.services}>
          All type Air Conditioners, (VRV, Chiller, PAC, Ductable) Installation, Mantinence & AMC
        </Text>
        <Text style={styles.address}>
          Plot No.4 Shree Moters Opp. Pillar No.113, 114 Ramnagar Vistar, New Sanganer, Road Sodala, Jaipur
          {'\n'}
          refrigerationjagdamba@gmail.com
        </Text>
      </View>

      <Text>Date {formData.date}</Text>
      
      <Text style={styles.quotationTitle}>QUOTATION</Text>
      <Text style={styles.workTitle}>DAIKIN VRV OUTDOOR UNIT REMOVING, REINSTALLATION WORKING</Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol}>Sr. No.</Text>
          <Text style={styles.tableColDescription}>Description</Text>
          <Text style={styles.tableCol}>Qty/nos.</Text>
          <Text style={styles.tableCol}>Amount</Text>
          <Text style={styles.tableCol}>Total amount</Text>
        </View>

        {formData.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCol}>{index + 1}.</Text>
            <Text style={styles.tableColDescription}>{item.description}</Text>
            <Text style={styles.tableCol}>{item.quantity}</Text>
            <Text style={styles.tableCol}>{item.amount}</Text>
            <Text style={styles.tableCol}>{item.total}</Text>
          </View>
        ))}

        <View style={styles.tableRow}>
          <Text style={styles.tableColDescription}>TOTAL AMOUNT</Text>
          <Text style={styles.tableCol}></Text>
          <Text style={styles.tableCol}></Text>
          <Text style={styles.tableCol}>{formData.totalAmount}</Text>
        </View>
      </View>

      <View style={styles.bankingDetails}>
        <Text>Banking details –</Text>
        <Text>Sturling urban co-oprative Bank Ltd</Text>
        <Text>Ac no. – 100101410353</Text>
        <Text>RTGS NEFT IFSC code – HDFC0CSTUCB</Text>
      </View>

      <Text style={styles.gstNote}>NOTE:- Shall be 18%gst extra</Text>
    </Page>
  </Document>
);

const PriceQuotation = () => {
  const [formData, setFormData] = useState({
    date: '04/12/2024',
    items: [
      {
        description: '',
        quantity: '',
        amount: '',
        total: '0.00'
      }
    ],
    totalAmount: '0.00'
  });

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    
    // Calculate new total for the item
    if (field === 'amount' || field === 'quantity') {
      const amount = parseFloat(newItems[index].amount) || 0;
      const quantity = parseFloat(newItems[index].quantity) || 0;
      newItems[index].total = (amount * quantity).toFixed(2);
    }
    
    // Calculate new total amount
    const newTotalAmount = newItems.reduce((sum, item) => sum + parseFloat(item.total || 0), 0).toFixed(2);
    
    setFormData({
      ...formData,
      items: newItems,
      totalAmount: newTotalAmount
    });
  };

  const addNewItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          description: '',
          quantity: '',
          amount: '',
          total: '0.00'
        }
      ]
    });
  };

  const removeItem = (indexToRemove) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, index) => index !== indexToRemove);
      const newTotalAmount = newItems.reduce((sum, item) => sum + parseFloat(item.total || 0), 0).toFixed(2);
      
      setFormData({
        ...formData,
        items: newItems,
        totalAmount: newTotalAmount
      });
    }
  };

  return (
    <Box sx={{  maxWidth: '800px', margin: 'auto' }}>
      <Paper elevation={0} sx={{ p: 3, border: '1px solid #ccc' }}>
        {/* Date Field */}
        <TextField
          fullWidth
          label="Date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          sx={{ mb: 3 }}
        />

        {/* Items */}
        {formData.items.map((item, index) => (
          <Box 
            key={index} 
            sx={{ 
              mb: 3, 
             
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              position: 'relative'
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Item {index + 1}
              {formData.items.length > 1 && (
                <IconButton 
                  color="error"
                  onClick={() => removeItem(index)}
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              )}
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={2}
              label="Description"
              value={item.description}
              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                sx={{ flex: 1 }}
              />
              <TextField
                label="Amount"
                value={item.amount}
                onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                sx={{ flex: 1 }}
              />
              <TextField
                label="Total"
                value={item.total}
                disabled
                sx={{ flex: 1 }}
              />
            </Box>
          </Box>
        ))}

        {/* Add Item Button */}
        <Button
          startIcon={<AddCircleOutlineIcon />}
          onClick={addNewItem}
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
        >
          Add New Item
        </Button>

        {/* Total Amount */}
        <TextField
          fullWidth
          label="Total Amount"
          value={formData.totalAmount}
          disabled
          sx={{ mb: 3 }}
        />

        {/* PDF Download Button */}
        <PDFDownloadLink
          document={<QuotationPDF formData={formData} />}
          fileName="quotation.pdf"
        >
          {({ blob, url, loading, error }) => (
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? 'Generating PDF...' : 'Download PDF'}
            </Button>
          )}
        </PDFDownloadLink>
      </Paper>
    </Box>
  );
};

export default PriceQuotation;
