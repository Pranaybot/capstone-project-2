export interface Card {
    id?: string;
    username: string;
    title: string;
    description: string;
    activity: string;
    isEditing?: boolean;
    editingUsername?: string;
    editingTitle?: string;
    editingDescription?: string;
    editingActivity?: string;
  }
  
