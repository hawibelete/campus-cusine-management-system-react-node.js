import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { Button } from "@/components/shared/ui/button";
import { Badge } from "@/components/shared/ui/badge";
import { Flag, CheckCircle, Clock, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shared/ui/avatar";

const FeedbackCard = ({ item, onMarkReviewed, onFlag }) => {
  const {
    feedbackId,
    customerName,
    email,
    imageUrl,
    rating,
    comment,
    loungeName,
    status,
    date,
  } = item;

  const getStatusBadge = () => {
    switch (status) {
      case 0:
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300 flex gap-1 items-center"
          >
            <Clock className="h-3 w-3" /> New
          </Badge>
        );
      case 1:
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-200 border-green-300 flex gap-1 items-center"
          >
            <CheckCircle className="h-3 w-3" /> Reviewed
          </Badge>
        );
      case 2:
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-300 flex gap-1 items-center"
          >
            <Flag className="h-3 w-3" /> Flagged
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="border-border/40 shadow-sm hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="d-flex align-items-center gap-3">
            {" "}
            <Avatar>
              <AvatarImage
                src={imageUrl}
                className="rounded-circle"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
              <AvatarFallback>{customerName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="d-flex flex-column">
              <div className="fw-medium">{customerName}</div>
              <div className="text-muted small">{email}</div>
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="mb-3">
          <div className="text-sm text-muted-foreground mb-1">Lounge</div>
          <div className="font-medium">{loungeName}</div>
        </div>

        <div className="mb-3">
          <div className="text-sm text-muted-foreground mb-1">Rating</div>
          <div className="flex items-center">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.round(parseFloat(rating))
                      ? "fill-amber-500 text-amber-500"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm">({rating}/5)</span>
          </div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground mb-1">Feedback</div>
          <div className="bg-muted/30 p-3 rounded-md text-sm">{comment}</div>
        </div>

        <div className="mt-3 text-xs text-muted-foreground">
          Submitted on {new Date(date).toLocaleDateString()}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t border-border/30 pt-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMarkReviewed(feedbackId)}
          disabled={status === 1}
          className={
            status !== 1
              ? "text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
              : ""
          }
        >
          <CheckCircle size={16} className="mr-1" />
          {status === 1 ? "Reviewed" : "Mark Reviewed"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onFlag(feedbackId)}
          disabled={status === 2}
          className={
            status !== 2
              ? "text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300"
              : ""
          }
        >
          <Flag size={16} className="mr-1" />
          {status === 2 ? "Flagged" : "Flag Issue"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeedbackCard;
