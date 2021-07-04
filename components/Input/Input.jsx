import React, { useState, useRef } from 'react';
import styles from './Input.module.scss';
import cx from 'classnames';


const Input = ({ clickOnTheIcon, theme, defaultValue, inputMode, pattern, placeholder = '', label = '', value, register, name, error, type, maxLength, onChange, onNativeChange, ...props }) => {
    const handler = (e) => {

        const val = e.target.value;
        if (type === 'number') {
            const el = val.slice(val.length - 1, val.length);
            const x = (/[0-9]+/g.test(el));
            if (x) onChange && onChange(val)
            //console.log(type,'TYPE', x)
        };
        if (type === 'text') {
            onChange && onChange(val)
            onNativeChange && onNativeChange(e)
        }
    }

    const styleInputText = [
        styles.InputText,
        { [styles.themeGreyInput]: theme === 'grey' },
        { [styles.InputText_disabled]: theme === 'disabled' }
    ]

    const wrapStyle = [
        { [styles.InputError]: !!error },
        { [styles.themeGreyWrap]: theme === 'grey' }
    ]




    return (
        <div className={cx(styleInputText)}>
            <label className={cx('label', styles.InputText__label)}>{label}</label>
            <div className={cx(styles.input, { [styles.InputError]: !!error })}>
                <input
                    // autoComplete='off'
                    type={type}
                    name={name}
                    maxLength={maxLength}
                    value={value}
                    ref={register}
                    onChange={(e) => handler(e)}
                    pattern={pattern}
                    inputMode={inputMode}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    {...props}
                />
            </div>

            {!!error && (
                <p className={'errorText'}>
                    {error.message}
                </p>
            )}
        </div>

    );
};

export default Input;