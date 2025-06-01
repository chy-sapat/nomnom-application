import icons from "@/constants/icons";
import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

interface InteractiveStarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

interface StaticStarRatingProps {
  rating: number;
  size: string;
}

export const InteractiveStarRating = ({
  rating,
  setRating,
}: InteractiveStarRatingProps) => {
  const description = ["Terrible", "Bad", "Okay", "Good", "Excellent"];
  return (
    <View className="flex gap-2 items-center">
      <View className="flex flex-row gap-4 justify-center">
        {[...Array(5)].map((_, index) => (
          <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
            <Image
              source={index < rating ? icons.star : icons.emptyStar}
              className="size-10"
              tintColor="#ffd700"
            />
          </TouchableOpacity>
        ))}
      </View>
      <Text className="font-rubik text-lg text-black-200 dark:text-white text-center">
        {`(${description[rating - 1] || "Rate Us"})`}
      </Text>
    </View>
  );
};

export const StaticStarRating = ({ rating, size }: StaticStarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  return (
    <View className="flex flex-row gap-4">
      {[...Array(5)].map((_, index) => (
        <Image
          key={index}
          source={
            index < fullStars
              ? icons.star
              : hasHalfStar && index === fullStars
              ? icons.halfStar
              : icons.emptyStar
          }
          className={
            size === "small"
              ? "size-6"
              : size === "medium"
              ? "size-8"
              : "size-10"
          }
          tintColor={"#FFD700"}
        />
      ))}
    </View>
  );
};
