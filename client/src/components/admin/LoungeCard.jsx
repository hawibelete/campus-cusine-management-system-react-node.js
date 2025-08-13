import React, { useState } from 'react';
import { Button } from "@/components/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/shared/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/admin/ui/dialog";
import { Edit, Trash2, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from "@/components/shared/ui/badge";

const LoungeCard = ({
  id,
  name,
  image,
  description,
  rating,
  location,
  capacity,
  onDelete,
  onEdit
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="flex flex-col h-[500px] overflow-hidden transition-all duration-300 hover:shadow-md border-border/40">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover transition-all duration-500 hover:scale-105"
        />
        <Badge className="absolute top-3 right-3 bg-white/80 text-foreground hover:bg-white/90 backdrop-blur-sm">
          {rating.toFixed(1)} <Star className="ml-1 h-3 w-3 fill-amber-500 text-amber-500" />
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-semibold">{name}</CardTitle>
            <CardDescription>{location}</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleExpanded} 
            className="text-muted-foreground hover:text-foreground" 
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        {expanded && (
          <div className="mt-4 space-y-3 animate-slide-down">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-secondary/50 p-2 rounded-md">
                <p className="text-muted-foreground">Capacity</p>
                <p className="font-medium">{capacity} people</p>
              </div>
              <div className="bg-secondary/50 p-2 rounded-md">
                <p className="text-muted-foreground">Rating</p>
                <div className="flex items-center font-medium">
                  {rating.toFixed(1)}
                  <div className="flex ml-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={12} 
                        className={i < Math.round(rating) ? "fill-amber-500 text-amber-500" : "text-gray-300"}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary/50 p-3 rounded-md">
              <p className="text-muted-foreground text-sm mb-1">Description</p>
              <p className="text-sm">{description}</p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onEdit(id)}
          className="text-blue-500 border-blue-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
        >
          <Edit size={16} className="mr-1" /> Edit
        </Button>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
            >
              <Trash2 size={16} className="mr-1" /> Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the
                <span className="font-semibold"> {name} </span>
                lounge and all associated data.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  onDelete(id);
                  setIsDeleteDialogOpen(false);
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default LoungeCard;
