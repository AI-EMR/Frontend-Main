import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import PharmacyChat from '@/components/chat/PharmacyChat';
import useAuthStore from '@/store/authStore';

// Mock data - replace with actual API integration later
const mockPrescriptions = [
  { 
    id: 'RX123',
    patientName: 'John Doe',
    patientId: 'P12345',
    medication: 'Amoxicillin 500mg',
    dosage: '1 tablet 3x daily',
    status: 'Pending',
    prescribedBy: 'Dr. Smith',
    date: '2024-03-10',
    hasUnreadMessages: true,
  },
  { 
    id: 'RX124',
    patientName: 'Jane Smith',
    patientId: 'P12346', 
    medication: 'Paracetamol 500mg',
    dosage: '2 tablets as needed',
    status: 'Ready for Pickup',
    prescribedBy: 'Dr. Johnson',
    date: '2024-03-09',
    hasUnreadMessages: false,
  },
];

const mockInventory = [
  { 
    id: 1, 
    name: 'Amoxicillin 500mg', 
    quantity: 500,
    unit: 'tablets',
    expiryDate: '2025-03-10',
    supplier: 'PharmaCorp'
  },
  { 
    id: 2, 
    name: 'Paracetamol 500mg', 
    quantity: 1000,
    unit: 'tablets',
    expiryDate: '2025-06-15',
    supplier: 'MediSupply'
  },
];

export default function PharmacyPage() {
  const { role } = useAuthStore();
  const [activeTab, setActiveTab] = useState('prescriptions');
  const [showNewPrescriptionDialog, setShowNewPrescriptionDialog] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showChatDialog, setShowChatDialog] = useState(false);

  const handleNewPrescription = (e) => {
    e.preventDefault();
    toast.success('Prescription created successfully');
    setShowNewPrescriptionDialog(false);
  };

  const handleStatusUpdate = (prescriptionId, newStatus) => {
    toast.success(`Prescription status updated to ${newStatus}`);
  };

  const handleChatOpen = (prescription) => {
    setSelectedPrescription(prescription);
    setShowChatDialog(true);
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Ready for Pickup': 'bg-green-100 text-green-800',
      'Completed': 'bg-blue-100 text-blue-800',
    };
    return (
      <Badge className={styles[status] || ''}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-display font-bold tracking-tight">Pharmacy Management</h1>
        {role === 'doctor' && (
          <Dialog open={showNewPrescriptionDialog} onOpenChange={setShowNewPrescriptionDialog}>
            <DialogTrigger asChild>
              <Button>New Prescription</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Prescription</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleNewPrescription} className="space-y-4">
                <div>
                  <Label htmlFor="patient">Patient Name</Label>
                  <Input id="patient" placeholder="Select patient" />
                </div>
                <div>
                  <Label htmlFor="medication">Medication</Label>
                  <Input id="medication" placeholder="Select medication" />
                </div>
                <div>
                  <Label htmlFor="dosage">Dosage Instructions</Label>
                  <Input id="dosage" placeholder="Enter dosage instructions" />
                </div>
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Input id="notes" placeholder="Enter any additional notes" />
                </div>
                <Button type="submit">Create Prescription</Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="prescriptions">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prescribed By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPrescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell>{prescription.patientName}</TableCell>
                  <TableCell>{prescription.medication}</TableCell>
                  <TableCell>{prescription.dosage}</TableCell>
                  <TableCell>{getStatusBadge(prescription.status)}</TableCell>
                  <TableCell>{prescription.prescribedBy}</TableCell>
                  <TableCell>{prescription.date}</TableCell>
                  <TableCell>
                    <div className="space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => handleChatOpen(prescription)}
                        className="relative"
                      >
                        Chat
                        {prescription.hasUnreadMessages && (
                          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
                        )}
                      </Button>
                      {role === 'pharmacist' && prescription.status === 'Pending' && (
                        <Button 
                          variant="outline" 
                          onClick={() => handleStatusUpdate(prescription.id, 'Ready for Pickup')}
                        >
                          Mark Ready
                        </Button>
                      )}
                      {role === 'pharmacist' && prescription.status === 'Ready for Pickup' && (
                        <Button 
                          variant="outline"
                          onClick={() => handleStatusUpdate(prescription.id, 'Completed')}
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="inventory">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.expiryDate}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>
                    <Button variant="outline">Update Stock</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      {/* Chat Dialog */}
      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
        <DialogContent className="max-w-2xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Prescription Communication</DialogTitle>
          </DialogHeader>
          {selectedPrescription && (
            <div className="flex-1 h-full max-h-[calc(80vh-8rem)] overflow-hidden">
              <PharmacyChat prescriptionId={selectedPrescription.id} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 