import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Fullscreen } from "lucide-react";
import { useFormContext } from "react-hook-form";
interface ImageSectionProps {
  pName: string;
  ratio: number;
}

const ImageSection: React.FC<ImageSectionProps> = ({ pName, ratio }) => {
  const { control, watch } = useFormContext();

  const existingImageUrl = watch("imageUrl");

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an image that will be displayed on your {pName}. Adding a new image will overwrite the existing one.
        </FormDescription>
      </div>

      <div className="flex flex-col gap-8" style={{ display: 'flex', alignItems: 'center', height:300, width:300}}>
        {existingImageUrl && (
          <div style={{ height: '80%', width:'80%' }}>
            <AspectRatio ratio={ratio}>
              <img
                src={existingImageUrl}
                className="rounded-md object-cover"
                style={{ height: '100%', width: '100%' }}
              />
            </AspectRatio>
          </div>
        )}
        <div className="px-2" style={{ height: '20%', width:'100%' }}>
          <FormField
            control={control}
            name="imageFile"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-white"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(event) =>
                      field.onChange(
                        event.target.files ? event.target.files[0] : null
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>


    </div>
  );
};

export default ImageSection;
