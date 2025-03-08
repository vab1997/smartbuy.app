'use server'

import { actionClient } from "@/lib/safe-action";
import { insertProductWishedSchema } from "@/schema/product-wished";
import { insertProductWishedHistorySchema } from "@/schema/product-wished-history";
import { productWishedService } from "@/services/product-wished";
import { redirect } from "next/navigation";
import { insertProductWishedHistoryUsageSchema } from "@/schema/product-wished-history-usage";
import { z } from "zod";
import { headers } from "next/headers";

const schema = insertProductWishedSchema.merge(insertProductWishedHistorySchema).merge(insertProductWishedHistoryUsageSchema).omit({
  productWishedId: true,
  productWishedHistoryId: true,
});

export const addProductWished = actionClient.schema(schema).action(async ({ parsedInput }) => {
  try {
    await productWishedService.create(parsedInput);
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    if (errorMessage.includes('violates unique constraint')) {
      throw new Error('El producto ya existe en la lista de productos deseados');
    }
    throw new Error('No se pudo agregar el producto a la lista de productos deseados');
  }

  redirect("/dashboard");
});

export const removeProductWished = actionClient.schema(z.object({
  id: z.string(),
})).action(async ({ parsedInput }) => {
  try {
    await productWishedService.remove(parsedInput.id);
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo eliminar el producto de la lista de productos deseados');
  }

  const headerList = await headers();
  let referer = '';
  for (const [key, value] of headerList.entries()) {
    if (key === 'referer') {
      referer = value;
    }
  }

  if (referer === '') {
    throw new Error('No se encontró el referer');
  }

  const url = new URL(referer);
  const searchParams = new URLSearchParams(url.search);
  const redirectUrl = url.pathname + '?' + searchParams.toString();
  redirect(redirectUrl);
});
