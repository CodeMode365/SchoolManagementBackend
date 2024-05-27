import type { OrganizationType } from "@/types/model";
import { model, Schema } from "mongoose";

const organizationSchema = new Schema<OrganizationType>({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  urls: [
    {
      title: String,
      url: {
        type: String,
        required: true,
        validate: {
          validator: function (value: string) {
            const urlRegex =
              /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
            return urlRegex.test(value);
          },
          message: (props: { value: string }) =>
            `${props.value} is not a valid URL!`,
        },
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Organization = model("Organization", organizationSchema);

export default Organization;
