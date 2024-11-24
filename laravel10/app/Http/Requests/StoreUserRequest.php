<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'username' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:6'
        ];
    }
    public function messages()
    {
        return [
            'username.required' => "Please Username not empty",
            'username.string' => "Username is string",
            'email.required' => "Please Email not empty",
            'email.email' => "Please Email wrong format",
            'email.unique' => "Email exist in database ! Please choose again ",
            'password.required' => "Please Password not empty"
        ];
    }
}
