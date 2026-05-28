'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Building2, Bell, CreditCard, Save, Upload, CheckCircle, Zap } from 'lucide-react';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Label, FormGroup } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

const provinces = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
  'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan',
  'Northwest Territories', 'Nunavut', 'Yukon',
];

type NotifToggle = { email: boolean; push: boolean };

const notifDefaults: Record<string, NotifToggle> = {
  'Match Reminders': { email: true, push: true },
  'Team Announcements': { email: true, push: true },
  'Injury Updates': { email: true, push: false },
  'Registration Alerts': { email: true, push: false },
  'Payment Reminders': { email: false, push: false },
  'System Updates': { email: false, push: false },
};

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={cn(
        'relative inline-flex h-5 w-9 rounded-full transition-colors duration-200 cursor-pointer',
        checked ? 'bg-red-600' : 'bg-muted'
      )}
    >
      <span className={cn(
        'inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 mt-0.5',
        checked ? 'translate-x-4 ml-0.5' : 'translate-x-0.5'
      )} />
    </button>
  );
}

export default function SettingsPage() {
  const { toast } = useToast();
  const [saved, setSaved] = useState<string | null>(null);
  const [notifs, setNotifs] = useState(notifDefaults);

  const handleSave = (tab: string) => {
    setSaved(tab);
    setTimeout(() => setSaved(null), 2500);
  };

  const toggleNotif = (key: string, channel: 'email' | 'push') => {
    setNotifs(prev => ({
      ...prev,
      [key]: { ...prev[key], [channel]: !prev[key][channel] },
    }));
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <DashboardHeader title="Settings" subtitle="Manage your account and club settings" />

      <div className="flex-1 px-4 py-4 sm:px-6 sm:py-6">
        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile"><User className="h-3.5 w-3.5 mr-1.5" />Profile</TabsTrigger>
            <TabsTrigger value="club"><Building2 className="h-3.5 w-3.5 mr-1.5" />Club</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="h-3.5 w-3.5 mr-1.5" />Notifications</TabsTrigger>
            <TabsTrigger value="billing"><CreditCard className="h-3.5 w-3.5 mr-1.5" />Billing</TabsTrigger>
          </TabsList>

          {/* Profile */}
          <TabsContent value="profile">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl space-y-5">
              <Card>
                <CardContent className="pt-5">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" name="Brian Kelly" size="xl" status="online" />
                    <div>
                      <Button variant="secondary" size="sm" onClick={() => toast('Photo upload coming soon', 'info')}>
                        <Upload className="h-3.5 w-3.5 mr-1.5" /> Change Photo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <FormGroup>
                        <Label>First Name</Label>
                        <Input defaultValue="Brian" />
                      </FormGroup>
                      <FormGroup>
                        <Label>Last Name</Label>
                        <Input defaultValue="Kelly" />
                      </FormGroup>
                    </div>
                    <FormGroup>
                      <Label>Email</Label>
                      <Input type="email" defaultValue="b.kelly@torontoarrowsrfc.ca" />
                    </FormGroup>
                    <FormGroup>
                      <Label>Phone</Label>
                      <Input type="tel" defaultValue="+1 (416) 555-0191" />
                    </FormGroup>
                    <FormGroup>
                      <Label>Role</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="red">Club Admin</Badge>
                        <span className="text-xs text-muted-foreground">Contact your administrator to change roles</span>
                      </div>
                    </FormGroup>
                  </div>
                </CardContent>
              </Card>
              <Button variant="primary" onClick={() => handleSave('profile')}>
                {saved === 'profile' ? <><CheckCircle className="h-4 w-4 mr-1.5" />Saved!</> : <><Save className="h-4 w-4 mr-1.5" />Save Profile</>}
              </Button>
            </motion.div>
          </TabsContent>

          {/* Club */}
          <TabsContent value="club">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl space-y-5">
              <Card>
                <CardHeader><CardTitle>Club Information</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <FormGroup>
                      <Label>Club Name</Label>
                      <Input defaultValue="Toronto Arrows RFC" />
                    </FormGroup>
                    <div className="grid grid-cols-2 gap-3">
                      <FormGroup>
                        <Label>City</Label>
                        <Input defaultValue="Toronto" />
                      </FormGroup>
                      <FormGroup>
                        <Label>Province</Label>
                        <select className="flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground border-border focus:border-red-500/60 focus:outline-none" defaultValue="Ontario">
                          {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </FormGroup>
                    </div>
                    <FormGroup>
                      <Label>Division</Label>
                      <Input defaultValue="Ontario Rugby Union — Premier Division" />
                    </FormGroup>
                    <FormGroup>
                      <Label>Founded Year</Label>
                      <Input type="number" defaultValue="1987" />
                    </FormGroup>
                    <div>
                      <Label>Club Colours</Label>
                      <div className="flex items-center gap-3 mt-1.5">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-red-600 border-2 border-white/20 cursor-pointer" />
                          <span className="text-xs text-muted-foreground">Primary</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-[#1E3A5F] border-2 border-white/20 cursor-pointer" />
                          <span className="text-xs text-muted-foreground">Secondary</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Button variant="primary" onClick={() => handleSave('club')}>
                {saved === 'club' ? <><CheckCircle className="h-4 w-4 mr-1.5" />Saved!</> : <><Save className="h-4 w-4 mr-1.5" />Save Club Settings</>}
              </Button>
            </motion.div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl">
              <Card>
                <CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader>
                <CardContent>
                  <div className="mb-3 grid grid-cols-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
                    <span>Category</span>
                    <span className="text-center">Email</span>
                    <span className="text-center">Push</span>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(notifs).map(([key, val]) => (
                      <div key={key} className="grid grid-cols-3 items-center py-2 border-b border-border last:border-0">
                        <span className="text-sm text-foreground font-medium">{key}</span>
                        <div className="flex justify-center">
                          <Toggle checked={val.email} onChange={() => toggleNotif(key, 'email')} />
                        </div>
                        <div className="flex justify-center">
                          <Toggle checked={val.push} onChange={() => toggleNotif(key, 'push')} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl space-y-5">
              {/* Current plan */}
              <Card className="border-amber-500/30">
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="h-4 w-4 text-amber-400" />
                        <span className="text-foreground font-bold">Professional Plan</span>
                        <Badge variant="gold">Active</Badge>
                      </div>
                      <p className="text-2xl font-bold text-foreground">$89<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                      <p className="text-xs text-muted-foreground mt-1">Next billing: November 1, 2024</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toast('Plan management coming soon', 'info')}>Manage Plan</Button>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { label: 'Players', used: 186, max: 250 },
                      { label: 'Teams', used: 8, max: 15 },
                      { label: 'Storage', used: 4.2, max: 10, unit: 'GB' },
                    ].map(item => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="text-foreground/80 font-semibold">{item.used}{item.unit ?? ''} / {item.max}{item.unit ?? ''}</span>
                        </div>
                        <div className="h-1.5 bg-border/40 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-linear-to-r from-red-600 to-amber-500"
                            style={{ width: `${(item.used / item.max) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upgrade */}
              <Card>
                <CardContent className="pt-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="h-5 w-5 text-amber-400" />
                    <div>
                      <p className="text-foreground font-semibold">Enterprise Plan — $199/month</p>
                      <p className="text-xs text-muted-foreground">Unlimited players, advanced analytics, dedicated support</p>
                    </div>
                  </div>
                  <Button variant="gold" size="sm" onClick={() => toast('Enterprise upgrade coming soon', 'info')}>Upgrade to Enterprise</Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
