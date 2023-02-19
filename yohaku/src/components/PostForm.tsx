import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

interface PostFormProps {
  className: string
}

const PostForm = ({ className }: PostFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const now = new Date
    let res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/posts`, {
    method: "POST",
    mode: 'cors',
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      content: data.content,
      created_at: now.toISOString()
    }),
  });
  res = await res.json();
  console.log(res)
  } 

  return (
    <>
      <form className={`${className} flex items-end`} onSubmit={handleSubmit(onSubmit)}>
        <textarea className='border' {...register("content", { required: true })} />
        {errors.content && <span>This field is required</span>}

      <input className='border p-1' type="submit"/>
      </form>
    </>
  );
}

export default PostForm