<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerificationCodeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $code;

    public function __construct($code)
    {
        $this->code = $code;
    }

    public function build(): VerificationCodeMail
    {

        return $this->subject('🔐 Action requise : Vérifiez votre compte')
                    ->view('emails.verification_code')
                    ->with(['code' => $this->code]);
    }
    
}   
