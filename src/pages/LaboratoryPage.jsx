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

// Mock data - replace with actual API integration later
const mockLabTests = [
  { id: 1, patientName: 'John Doe', testType: 'Blood Test', status: 'Pending', requestedBy: 'Dr. Smith', date: '2024-03-10' },
  { id: 2, patientName: 'Jane Smith', testType: 'X-Ray', status: 'Completed', requestedBy: 'Dr. Johnson', date: '2024-03-09' },
];

const mockResults = [
  { id: 1, patientName: 'Jane Smith', testType: 'X-Ray', result: 'Normal', date: '2024-03-09', uploadedBy: 'Lab Tech A' },
];

export default function LaboratoryPage() {
  const [activeTab, setActiveTab] = useState('requests');
  const [showNewRequestDialog, setShowNewRequestDialog] = useState(false);

  const handleNewRequest = (e) => {
    e.preventDefault();
    toast.success('Test request created successfully');
    setShowNewRequestDialog(false);
  };

  const handleUploadResult = (testId) => {
    toast.success('Test result uploaded successfully');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-display font-bold tracking-tight">Laboratory & Diagnostics</h1>
        <Dialog open={showNewRequestDialog} onOpenChange={setShowNewRequestDialog}>
          <DialogTrigger asChild>
            <Button>New Test Request</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Test Request</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleNewRequest} className="space-y-4">
              <div>
                <Label htmlFor="patient">Patient Name</Label>
                <Input id="patient" placeholder="Select patient" />
              </div>
              <div>
                <Label htmlFor="testType">Test Type</Label>
                <Input id="testType" placeholder="Select test type" />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input id="notes" placeholder="Additional notes" />
              </div>
              <Button type="submit">Create Request</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="requests">Test Requests</TabsTrigger>
          <TabsTrigger value="results">Test Results</TabsTrigger>
        </TabsList>

        <TabsContent value="requests">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Test Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLabTests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell>{test.patientName}</TableCell>
                  <TableCell>{test.testType}</TableCell>
                  <TableCell>{test.status}</TableCell>
                  <TableCell>{test.requestedBy}</TableCell>
                  <TableCell>{test.date}</TableCell>
                  <TableCell>
                    {test.status === 'Pending' && (
                      <Button variant="outline" onClick={() => handleUploadResult(test.id)}>
                        Upload Result
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="results">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Test Type</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>{result.patientName}</TableCell>
                  <TableCell>{result.testType}</TableCell>
                  <TableCell>{result.result}</TableCell>
                  <TableCell>{result.date}</TableCell>
                  <TableCell>{result.uploadedBy}</TableCell>
                  <TableCell>
                    <Button variant="outline">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
} 