import { useState } from "react";
import { ChevronLeft, Plus } from "lucide-react";
import { toast } from "sonner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUploader from "../Product/ProductForm/ImageUploader";
import { useCreateCategory } from "@/mutations/category.mutations";

const StepIndicator = ({ currentStep }) => (
  <DialogHeader className="flex items-center justify-center flex-row">
    <DialogTitle
      className={
        "bg-black text-white w-10 h-10 flex items-center justify-center rounded-full"
      }
    >
      1
    </DialogTitle>
    <div
      className={`py-[2px] w-1/2 ${
        currentStep === 2 ? "bg-black" : "bg-gray-200"
      }`}
    ></div>
    <DialogTitle
      className={`${
        currentStep === 2 ? "bg-black text-white" : "bg-gray-200"
      } w-10 h-10 flex items-center justify-center ms-[-2px] rounded-full`}
    >
      2
    </DialogTitle>
  </DialogHeader>
);

const AvailabilityToggle = ({ field }) => (
  <label className="inline-flex items-center rounded-md cursor-pointer">
    <input
      type="checkbox"
      className="hidden peer"
      checked={field.value}
      onChange={() =>
        field.onChange({
          target: { name: field.name, value: !field.value },
        })
      }
    />
    <span className="px-4 py-2 rounded-l-lg bg-gray-300 text-black peer-checked:text-white peer-checked:bg-black">
      Available
    </span>
    <span className="px-4 py-2 rounded-r-lg bg-black text-white peer-checked:text-black peer-checked:bg-gray-300">
      Unavailable
    </span>
  </label>
);

const CategoryForm = ({ images, goBack, onSubmit }) => (
  <Formik
    initialValues={{ name: "", isActive: false }}
    validationSchema={Yup.object({
      name: Yup.string().required("Category name is required"),
    })}
    onSubmit={(values) => {
      if (images.length === 0) {
        toast.error("Please select at least one image");
        return;
      }
      onSubmit({ ...values, images });
    }}
  >
    {({ isSubmitting }) => (
      <Form className="flex flex-col items-start gap-4 w-full">
        <div className="w-full">
          <Label htmlFor="name">Name</Label>
          <Field
            name="name"
            as={Input}
            id="name"
            placeholder="Category name"
            className="mt-2"
          />
          <div className="text-red-500 text-sm mt-1 min-h-[1.25rem]">
            <ErrorMessage name="name" component="div" />
          </div>
        </div>

        <div className="my-4 w-full">
          <div className="mb-4">
            <h3 className="font-medium text-black text-md">availability</h3>
            <p className="text-gray-500 text-xs font-medium">
              Toggle category availability
            </p>
          </div>
          <Field name="isActive">
            {({ field }) => <AvailabilityToggle field={field} />}
          </Field>
        </div>

        <DialogFooter className="flex gap-4 mt-2 w-full flex-row justify-between">
          <Button
            type="button"
            onClick={goBack}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft size={16} /> Back
          </Button>
          <Button type="submit">Finish (2/2)</Button>
        </DialogFooter>
      </Form>
    )}
  </Formik>
);

export function CategoryDialog() {
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState([]);
  const { mutateAsync: createCategory } = useCreateCategory();
  const handleSubmit = async (values) => {
    try {
      if (!navigator.onLine) {
        return toast.error(
          "No internet connection. Please check your network."
        );
      }

      if (images.length < 1) {
        return toast.error("Must select at least 1 image");
      }

      values.images = images;

      await toast.promise(createCategory(values), {
        loading: "Creating category, please wait...",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const validateStep1 = () => {
    if (images.length === 0) {
      toast.error("Please select at least one image");
      return false;
    }
    return true;
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setCurrentStep(1);
          setImages([]);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-black text-white py-5 cursor-pointer  ">
          {" "}
          <Plus /> New Category
        </Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-[35%] max-w-[425px]">
        <StepIndicator currentStep={currentStep} />

        <div className="py-2">
          {currentStep === 1 ? (
            <>
              <ImageUploader
                setImages={setImages}
                images={images}
                isEditable={true}
              />
              <DialogFooter className="mt-4">
                <Button
                  onClick={() => validateStep1() && setCurrentStep(2)}
                  disabled={images.length === 0}
                >
                  Next (1/2)
                </Button>
              </DialogFooter>
            </>
          ) : (
            <CategoryForm
              images={images}
              goBack={() => setCurrentStep(1)}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
